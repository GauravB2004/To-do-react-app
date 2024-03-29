let globalId = 1;
let todoState = [];
let oldTodoState = [];


function App() {

  function addTodoToDom(addedTodos) {
    const todos = document.getElementById('todos');

    const newTodoDiv = document.createElement('div');
    newTodoDiv.setAttribute("id", addedTodos[0].id);

    const title = document.createElement('div');
    title.innerText = `title : ${addedTodos[0].title}`;
    newTodoDiv.append(title);

    const description = document.createElement('div');
    description.innerHTML = `description: ${addedTodos[0].description}`
    newTodoDiv.append(description);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', function () {
      removeTodo(addedTodos[0].id);
    });

    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.addEventListener('click', function () {
      const UpdateDiv = document.createElement('div');

      const newTitle = document.createElement('input')
      newTitle.placeholder = "new title "
      const newDescription = document.createElement('input')
      newDescription.placeholder = "new description "
      const UpdateButton = document.createElement('button');
      UpdateButton.innerText = "Update";

      UpdateButton.addEventListener('click', function () {
        updateTodo(newTodoDiv.id, newTitle.value, newDescription.value);
        UpdateDiv.remove();
      });

      UpdateDiv.append(newTitle);
      UpdateDiv.append(newDescription);
      UpdateDiv.append(UpdateButton);

      newTodoDiv.append(UpdateDiv);
    })

    newTodoDiv.append(deleteButton);
    newTodoDiv.append(editButton);

    todos.append(newTodoDiv);
  }
  

  function removeTodoFromDom(id) {
    const todoElement = document.getElementById(id);
    if (todoElement) {
      todoElement.remove();
    }
  }

  function updateTodoInDom(oldTodo, newTodo) {
    const currTodo = document.getElementById(oldTodo.id);
    currTodo.children[0].innerText = `title: ${newTodo.title}`;
    currTodo.children[1].innerText = `description: ${newTodo.description}`;
  }


  function updateState(newTodos) {
    const added = [];
    const deleted = [];
    const updated = [];

    for (let i = 0; i < newTodos.length; i++) {
      const newTodo = newTodos[i];
      const oldTodo = oldTodoState.find(todo => todo.id === newTodo.id);

      if (!oldTodo) {
        // New todo added
        added.push(newTodo);
      } else {
        // Check if updated
        if (
          oldTodo.title !== newTodo.title ||
          oldTodo.description !== newTodo.description
        ) {
          updated.push(newTodo);
        }
      }
    }

    // Check for deleted todos
    for (let i = 0; i < oldTodoState.length; i++) {
      const oldTodo = oldTodoState[i];
      const existsInNew = newTodos.some(todo => todo.id === oldTodo.id);

      if (!existsInNew) {
        deleted.push(oldTodo);
      }
    }

    // Perform actions based on changes
    added.forEach(todo => addTodoToDom([todo]));
    updated.forEach(todo => updateTodoInDom(oldTodoState.find(oldTodo => oldTodo.id === todo.id), todo));
    deleted.forEach(todo => removeTodoFromDom(todo.id));

    // Update oldTodoState
    oldTodoState = JSON.parse(JSON.stringify(newTodos));
  }

  function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    todoState.push({
      title: title,
      description: description,
      id: globalId++,
    });
    updateState(todoState);
  }

  function removeTodo(id) {
    todoState = todoState.filter(item => item.id !== id);
    updateState(todoState);
  }

  function updateTodo(id, newTitle, newDescription) {
    todoState = todoState.map(todo => {
      if (todo.id === parseInt(id)) {
        todo.title = newTitle;
        todo.description = newDescription;
      }
      return todo;
    });

    updateState(todoState);
  }

  return (
    <div>
      <h1>Todo App</h1>

      <input type="text" id="title" placeholder="Todo title" />
      <br />
      <input type="text" id="description" placeholder="Todo description"/>
      <br />
      <button onClick={addTodo}>Add todo</button>

      <div id="todos"></div>
    </div>
  )
}

export default App;