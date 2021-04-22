import { useState } from 'react';
import { formatDistanceToNowStrict, format, isPast } from 'date-fns';
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

const TodoItem = ( {id, desc, date, completed, deleteTodo, handleChangeCompleted, editTodo} ) => {

  const [isEditing, setIsEditing] =  useState(false);
  const [editedTodo, setEditedTodo] = useState(desc);
  const [newDate, setNewDate] = useState(null);

  const handleSaveTodo = () =>{
    if(!newDate){
      editTodo(id, editedTodo, date);
      setIsEditing(false);
    }
    else{
      const {year, month, day, hours, minutes} = newDate;
      editTodo(id, editedTodo, new Date(year, parseInt(month) -1, day, hours, minutes));
      setIsEditing(false);
    }
  }

  if(isEditing){
    return (
      <li className="do">
        <div className="edit-container">
          <input 
            type="text" 
            value={editedTodo} 
            onChange={(e) => setEditedTodo(e.target.value)}
          />
          <div>
            <button id="save" onClick={handleSaveTodo}>Save</button>
            <button id="cancel" onClick={()=> setIsEditing(false)}>Cancel</button>
          </div>
        </div>
        <DtPicker 
            onChange={setNewDate} 
            withTime
            placeholder={format(new Date(date), 'Pp')}
            inputClass= "date-edit-input" 
            calenderModalClass="calendar-modal"
            headerClass="calendar-header"
          />
      </li>
    );
  }

  return (
    <li className="do">
      <div className="t-container">
        <span 
          className={`${completed}`}
          onClick={()=>handleChangeCompleted(id)}
        >{desc}</span>
        <div>
          <i 
            className="fa fa-trash" 
            aria-hidden="true" 
            onClick={()=>deleteTodo(id)}>
          </i>
          <i 
            className="fa fa-pencil" 
            aria-hidden="true" 
            onClick={()=> setIsEditing(true)}>
          </i>
        </div>
      </div>
      <span className={`date ${isPast(new Date(date))}`}>
        {isPast(new Date(date))? 
          `Expired: ${formatDistanceToNowStrict(new Date(date))} ago`:
          `Expires in: ${formatDistanceToNowStrict(new Date(date))}`}
      </span>
    </li>
  )
}

export default TodoItem;