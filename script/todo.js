document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form');
  const input = document.querySelector('.form_input');
  const todoList = document.querySelector('.todoList');

  // Function to fetch and display all todos
  function fetchTodos() {
      console.log('Fetching todos...');
      fetch('/todos')
          .then(response => response.json())
          .then(todos => {
              console.log('Received todos:', todos);
              todoList.innerHTML = '';
              todos.forEach(todo => {
                  const li = document.createElement('li');
                  li.textContent = todo.task;
                  todoList.appendChild(li);
              });
          })
          .catch(error => console.error('Error fetching todos:', error));
  }

  // Function to add a new todo
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const task = input.value.trim();
      console.log('Adding todo:', task);
      if (task) {
          fetch('/todos', {
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

  // Fetch todos on page load
  console.log('Fetching todos on page load...');
  fetchTodos();
});
