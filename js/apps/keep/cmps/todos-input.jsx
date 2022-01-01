export function TodosInput(todos) {
    return (
    todos.todos.map((todo,idx) =>
        <div className='input-container'>
            <input
            placeholder='Enter Todo'
            name='txt'
            key={idx}
            type='text'
            id='by-label'
            value={todo.txt ||''}/>
        </div>)          
       )
}