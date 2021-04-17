import { useState } from 'react';
import {nanoid} from "nanoid";

const TaskForm = ({todos, setTodos}) => {
    
    const [todo, setTodo] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(todo.length > 0)
            setTodos([{
                id: nanoid(3),
                desc: todo,
                completed: false}, ...todos]);
        setTodo("");
    }

    return (
        <form id="form" onSubmit={handleSubmit}>
            <input 
                className= "input" 
                placeholder="Task" 
                type="text" 
                id="task"
                onChange={(e)=> setTodo(e.target.value)}
                value={todo}
            />
            <input className= "button" type="submit" value="Add task"/>
        </form>
    )
}

export default TaskForm
