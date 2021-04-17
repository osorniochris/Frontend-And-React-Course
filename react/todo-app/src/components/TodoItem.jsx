import { useState } from 'react';

const TodoItem = ( {id, desc, deleteTodo, completed, handleChangeCompleted, editTodo} ) => {

  const [isEditing, setIsEditing] =  useState(false);
  const [editedTodo, setEditedTodo] = useState(desc)

  const handleSaveTodo = () =>{
    editTodo(id, editedTodo);
    setIsEditing(false);
  }

  if(isEditing){
    return (
      <li className="do">
        <div className="edit-container">
          <input 
            type="text" 
            value={editedTodo} 
            onChange={(e)=> setEditedTodo(e.target.value)}
          />
          <div>
            <button id="save" onClick={handleSaveTodo}>Save</button>
            <button id="cancel" onClick={()=> setIsEditing(false)}>Cancel</button>
          </div>
        </div>
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
    </li>
  )
}

export default TodoItem;