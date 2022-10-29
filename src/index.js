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

        displayTodos()
    })
})

function displayTodos() {
    const todoList = document.querySelector('#todo-list')   

    todoList.innerHTML = ''

    todos.forEach(todo => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        const label = document.createElement('label')
        const input = document.createElement('input')
        const span = document.createElement('span')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const editBtn = document.createElement('button')
        const delBtn = document.createElement('button')

        input.type = 'checkbox' 
        input.checked = todo.done
        span.classList.add('bubble')

        if (todo.category === 'personal') {
            span.classList.add('personal')  
        } else {
            span.classList.add('business')
        }

        content.classList.add('todo-content')
        actions.classList.add('actions')
        editBtn.classList.add('edit')
        delBtn.classList.add('delete')

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
        editBtn.innerHTML = 'Edit'
        delBtn.innerHTML = 'Delete'

        label.appendChild(input)
        label.appendChild(span)
        actions.appendChild(editBtn)
        actions.appendChild(delBtn) 
        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(actions)

        todoList.appendChild(todoItem)

        if (todo.done) {
            todoItem.classList.add('done')
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked
            // every time we update sync we want to call localStorage and set it
            localStorage.setItem('todos', JSON.stringify(todos))

            if (todo.done) {
                todoItem.classList.add('done')
            } else {
                todoItem.classList.remove('done')
            }

            displayTodos()
        })


        // Edit a todo item field in the todo list
        editBtn.addEventListener('click', () => {
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                displayTodos()
            })
        })

        // Delete a todo item in the todo list
        delBtn.addEventListener('click', () => {
            // remove the ones we've clicked
            todos = todos.filter(t => t != todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            displayTodos()
        })
    })
}