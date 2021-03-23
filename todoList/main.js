// Variables
const form = document.querySelector('#form')
const inputTask = document.querySelector('#task')
const inputSubject = document.querySelector('#subject')
const list = document.querySelector('#tasks-container')
const tasks = []

// Functiones
const addNewTask = () => {
  const newTask = { name: inputTask.value, subject: inputSubject.value, status: "undone"}
  if(newTask && inputTask.value.length > 0 && inputSubject.value.length > 0) {
    tasks.push(newTask)
  }
  inputTask.value = ''
  inputSubject.value = ''
}

const showTasks = () => {
  const html = tasks.map((task, id) => createTask(task, id)).join(' ')
  list.innerHTML = html
}

const createTask = ( {name, subject, status} , id) => {
  return `<li class="do" id="t-${id}">
            <div class="t-container">
              <span class="${status}" onclick="changeTaskStatus(${id})">${name}</span>
              <i class="fa fa-trash" aria-hidden="true" onclick="deleteTask(${id})"></i>
            </div>
            <p class="t-subject">${subject}</p>
          </li>`
}

const deleteTask = (id) => {
  tasks.splice(id, 1)
  showTasks()
  updateLocalStorage()
}

const changeTaskStatus = (id) => {
  const currentTask = tasks[id]
  currentTask.status = (currentTask.status === "done")? "undone" : "done"
  tasks.splice(id, 1, currentTask)
  showTasks()
  updateLocalStorage()
}

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getLocalStorage = () => {
  const taskList = localStorage.getItem('tasks')
  if(taskList) {
    const localTasks = JSON.parse(taskList)
    localTasks.forEach(task => {
      tasks.push(task)
    })
  }
  showTasks()
}

// Event Listeners
form.addEventListener('submit', (event) => {
  event.preventDefault()
  addNewTask()
  updateLocalStorage()
  showTasks()
})

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault()
  getLocalStorage()
})