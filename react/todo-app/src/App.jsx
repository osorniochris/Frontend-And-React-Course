import { useEffect, useState } from 'react';
import TaskForm  from './components/TaskForm';
import TodoItem from './components/TodoItem';
import "./App.css"


const FILTER_MAP = {
    All : () => true,
    Active : (todo) => !todo.completed,
    Completed : (todo) => todo.completed
}

const filterKeys = Object.keys(FILTER_MAP);

const initialState = JSON.parse(localStorage.getItem("todos") || "[]");
const filterInitialState = localStorage.getItem("filter") || "All";

const App = () => {

    const [todos, setTodos] = useState(initialState);
    const [filter, setFilter] = useState(filterInitialState);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    useEffect(() => {
        localStorage.setItem("filter", filter);
    }, [filter])

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleChangeCompleted = (id) =>{
        const newTodos = todos.map(todo =>{
            if(todo.id === id)
                return {...todo, completed: !todo.completed}
            return todo
        })
        setTodos(newTodos);
    }

    const editTodo = (id, desc) =>{
        const newTodos = todos.map(todo =>{
            if (todo.id === id){
                return {...todo, desc};
            }
            return todo;
        })
        setTodos(newTodos);
    }
  
    return (
        <section id="todo-list">
            <h1 id="title">ToDo List</h1>
            <TaskForm todos={todos} setTodos={setTodos}/>
            <section id="filters">
                {
                    filterKeys.map(filterkey => {
                        if(filterkey === filter)
                            return (
                                <button 
                                    key={`button-${filterkey}`} 
                                    className="active" 
                                    onClick={()=>setFilter(filterkey)}> {filterkey} tasks
                                </button>
                            )
                        return (
                            <button 
                                key={`button-${filterkey}`}
                                onClick={()=>setFilter(filterkey)}>{filterkey} tasks
                            </button>
                        )
                    })
                }
            </section>
            <ul id="tasks-container">
                {
                    todos.length > 0?
                    todos.filter(FILTER_MAP[filter]).map(({id, desc, completed}) => (
                        <TodoItem 
                            key={id} 
                            id={id} 
                            desc={desc} 
                            completed={completed}
                            deleteTodo={deleteTodo}
                            handleChangeCompleted={handleChangeCompleted}
                            editTodo={editTodo}
                        /> 
                    ))
                    : 
                    (<li className="do">
                            <div className="t-container">
                                <h3 id="no-tasks">
                                    No tasks, you are free :)
                                </h3>
                            </div>
                        </li>)
                }
            </ul>
        </section>
    )
}

export default App;