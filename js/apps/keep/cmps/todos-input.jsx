export function TodosInput(todos) {
    return todos.todos.forEach(todo =>{
        return(
        <div className='input-container'>
            <input
                placeholder='Enter Todo'
                name='label'
                type='text'
                id='by-label'
                value={todo.txt || ''}/>
        </div>
          )
    })
}