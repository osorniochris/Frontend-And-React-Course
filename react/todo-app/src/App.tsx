import { useState } from 'react';
import Todo from './components/Todo';
import {nanoid} from "nanoid";

const initialState = [
    {id: "0", desc: "Leer pdf 0" },
    {id: "1", desc: "Leer pdf 0" },
    {id: "2", desc: "Leer pdf 0" }
]

interface Task {
    id: string;
    desc: string;
}

const App = () => {

    const [todos, setTodos] = useState(initialState);
    const [todo, setTodo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodos([{id: nanoid(3), desc: todo}, ...todos]);
        setTodo("")
    }

    const deleteTodo = (id:string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }
  
    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <br/>
            <main>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={todo} onChange={handleChange}/>
                </form>
                <section>
                    {
                        todos.map(( {id , desc}: Task ) => {
                            return(
                                <Todo key={id} id={id} desc={desc} deleteTodo={deleteTodo}/>
                            )
                        })
                    }   
                </section>
            </main>
        </>
    );
};

export default App;