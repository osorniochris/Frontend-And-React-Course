import { useState } from 'react';
import {nanoid} from "nanoid";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

const TaskForm = ({todos, setTodos}) => {
    
    const [todo, setTodo] = useState("");
    const [date, setDate] = useState(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(todo.length > 0 && date){
            const {year, month, day, hours, minutes} = date;
            const todoDate = new Date(year, parseInt(month)-1, day, hours, minutes);
            setTodos([{
                id: nanoid(3),
                desc: todo,
                completed: false, 
                date: todoDate}, ...todos]);
            setTodo("");
            setDate(null);
        }
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
            <DtPicker 
                onChange={setDate} 
                withTime
                placeholder= "Expiration date and hour"
                inputClass= "date-input" 
                calenderModalClass="calendar-modal"
                headerClass="calendar-header"
            />
            <input className= "button" type="submit" value="Add task"/>
        </form>
    )
}

export default TaskForm
