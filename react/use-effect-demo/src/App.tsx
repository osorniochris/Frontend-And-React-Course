import { useEffect, useState } from 'react';
import { UpdateState } from './components/UpdateState';
import { User } from './components/User';

interface SingleUser{
    id: number,
    name: string,
    email: string
}

const App = () => {

    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        const getData = async () =>{
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    return (
        <div>
            <h1>Use Effect Example</h1>
            <br/>
            <UpdateState setUsers={setUsers}/>
            <br/>
            <section>
                {
                    users.map(({id, name, email}: SingleUser) => 
                        (<User key={id} id={id} name={name} email={email} />)
                    )
                }
            </section>
        </div>
    );
};

export default App;