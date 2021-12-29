export function MakeToDoList(todos) {
    const Todo = todos.todos.map((todo,idx) =>{
            return <p key={idx}>{todo.txt}</p>
        })
    return Todo
        
}