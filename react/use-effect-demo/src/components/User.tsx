
interface SingleUser{
    id: number,
    name: string,
    email: string
}

export const User = ({id, name, email}: SingleUser) => {
    return (
        <div key={id}>
            <p>{name}</p>
            <p>{email}</p>
            <hr/>
        </div>
    )
}
