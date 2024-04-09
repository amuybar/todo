// Define an array to store todo items
let todoList = [];

// Function to add a new todo item to the DOM
function addItemToDom(todoId, todoItem) {
  const ul = document.querySelector('.todoList');
  const li = document.createElement('li');
  li.id = todoId;
  li.innerHTML = `
  <input type="checkbox">
    <span>${todoItem}</span>
    <span class="icons">
      <i class="fas fa-edit edit"></i>
      <i class="fas fa-trash delete"></i>
    </span>
  `;
  ul.appendChild(li);
}

// Function to add a new todo item to the array
function addItemToArray(todoId, todoItem) {
  todoList.push({ id: todoId, item: todoItem });
}

// Function to delete a todo item from the array
function deleteItemFromArray(todoId) {
  todoList = todoList.filter(item => item.id !== todoId);
}

// Function to delete a todo item from the DOM
function deleteItemFromDom(todoId) {
  const li = document.getElementById(todoId);
  li.remove();
}

// Function to handle form submission and add todo item
function handleFormSubmit(event) {
  event.preventDefault();
  const todoInput = document.querySelector('.form_input');
  const todoItem = todoInput.value.trim();
  if (todoItem !== '') {
    let todoId = String(Date.now());
    addItemToDom(todoId, todoItem);
    addItemToArray(todoId, todoItem);
    todoInput.value = '';
  }
}

// Function to handle click events on todo items (for deletion)
function handleTodoClick(event) {
  if (event.target.classList.contains('delete')) {
    let todoId = event.target.parentNode.parentNode.id;
    deleteItemFromArray(todoId);
    deleteItemFromDom(todoId);
  }
}

// Add event listeners
document.querySelector('.form').addEventListener('submit', handleFormSubmit);
document.querySelector('.todoList').addEventListener('click', handleTodoClick);
