
interface Task {
    id: string;
    desc: string;
    deleteTodo: Function;
}

const Todo = ( {id, desc, deleteTodo }: Task ) => {
    return (
        <p>{id} = {desc}
            <button onClick={() => deleteTodo(id)}>del</button>
        </p>
    )
}

export default Todo;