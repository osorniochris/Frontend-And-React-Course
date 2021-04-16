
export const UpdateState = ( {setUsers}:{setUsers:Function} ) => {
    return (
        <div>
            <button onClick={()=>setUsers([])}>Clear Users</button>
        </div>
    )
}
