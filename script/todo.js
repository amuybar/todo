
  const form = document.querySelector('.form');
  const input = document.querySelector('.form_input');
  const todoList = document.querySelector('.todoList');



// Function to add a new todo
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const task = input.value.trim();
  console.log('Adding todo:', task);
  if (task) {
      fetch('https://todo-backend-19vf.onrender.com/todos', { // Update the URL for POST request
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task })
      })
      .then(response => response.json())
      .then(newTodo => {
          console.log('Todo added successfully:', newTodo);
          const li = document.createElement('li');
          li.textContent = newTodo.task;
          todoList.appendChild(li);
          input.value = '';
      })
      .catch(error => console.error('Error adding todo:', error));
  }
});

// Function to fetch todos on page load
function fetchTodos() {
  fetch('https://todo-backend-19vf.onrender.com/todos') // Update the URL for GET request
      .then(response => response.json())
      .then(todos => {
          todoList.innerHTML = '';
          todos.forEach(todo => {
              const li = document.createElement('li');

              const taskText = document.createElement('span');
              taskText.textContent = todo.task;
              li.appendChild(taskText);

              todoList.appendChild(li);
              
              const editIcon = document.createElement('i');
              editIcon.className = 'fas fa-edit edit-icon';
              editIcon.addEventListener('click', () => handleEdit(todo.id, todo.task)); // Add event listener for edit icon
              li.appendChild(editIcon);

              const deleteIcon = document.createElement('i');
              deleteIcon.className = 'fas fa-trash-alt delete-icon';
              deleteIcon.addEventListener('click', () => handleDelete(todo.id)); // Add event listener for delete icon
              li.appendChild(deleteIcon);

              
          });
      })
      .catch(error => console.error('Error fetching todos:', error));
}

// Function to handle edit action
function handleEdit(id, task) {
  const newTask = prompt('Edit task:', task);
  if (newTask !== null && newTask.trim() !== '') {
      fetch(`https://todo-backend-19vf.onrender.com/todos/${id}`, { // Update the URL for PUT request
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task: newTask })
      })
      .then(response => response.json())
      .then(updatedTodo => {
          fetchTodos(); // Reload todos after edit
      })
      .catch(error => console.error('Error editing todo:', error));
  }
}

// Function to handle delete action
function handleDelete(id) {
  if (confirm('Are you sure you want to delete this task?')) {
      fetch(`https://todo-backend-19vf.onrender.com/todos/${id}`, { // Update the URL for DELETE request
          method: 'DELETE'
      })
      .then(response => {
          if (response.ok) {
              fetchTodos(); // Reload todos after delete
          } else {
              console.error('Error deleting todo:', response.statusText);
          }
      })
      .catch(error => console.error('Error deleting todo:', error));
  }
}


// Fetch todos on page load
console.log('Fetching todos on page load...');
fetchTodos();
