export function ToDoList(todos) {
    const Todo = todos.todos.map((todo,idx) =>{
            if (todo.doneAt === null) {
                return <p key={idx}>● {todo.txt}</p>
            } else {
                return <p style={{textDecoration:"line-through"}} key={idx}>● {todo.txt}</p>
            }
        })
    return Todo

}