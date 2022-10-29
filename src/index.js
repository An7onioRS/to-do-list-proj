import './style.css'
let todos = ''

window.addEventListener('load', () => {
    // if there is any new todos saved in localStorage, get these (encoded as a JSON string) 
    todos = JSON.parse(localStorage.getItem('todos')) || []
    const nameInput = document.querySelector('#name')
    const newTodoForm = document.querySelector('#new-todo-form')
    
    // get a username (single string) from a database, in this case localStorage
    const username = localStorage.getItem('username') || ''

    nameInput.value = username

    nameInput.addEventListener('change', e => {
        // set a username in localStorage
        localStorage.setItem('username', e.target.value)
    })

    // set JSON code in localStorage
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault()


        // create a new todo object
        const todo = {
            // we get our content from the specific form element (.content is the value of the "name" attribute) and we then use .value to get the actual value
            content: e.target.elements.content.value !== "" ? e.target.elements.content.value : 'Missing field',
            category: e.target.elements.category.value !== "" ? e.target.elements.category.value : 'Missing field',
            done: false,
            createdAt: new Date().getTime()
        }

        // add the new todo object to the todos array
        todos.push(todo)

        // save our localStorage item by turning it into JSON with JSON.stringify() which turns the array into a JSON string
        localStorage.setItem('todos', JSON.stringify(todos))

        e.target.reset()
    })
})