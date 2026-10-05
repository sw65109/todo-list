const list = document.querySelector(".list");
const input = document.querySelector("input");


let todoList = [];
let todoInputValue = "";
let counter = 0;

const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (savedTodos) {
    todoList = savedTodos;
    counter = todoList.length;
    renderTodos();
}

function onInputChange(event) {
    todoInputValue = event.target.value
}

function addTodo() {
    if (!todoInputValue) {
        return;
    }
    todoList.push({
        id: counter++,
        task: todoInputValue,
        completed: false,
    });
    saveTodos();
    renderTodos();
    input.value = "";
    todoInputValue = "";
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function toggleCompleted(id) {
    todoList = todoList.map(todo =>
        todo.id === id? { ...todo, completed: !todo.completed} : todo
    );

    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todoList = todoList.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

function renderTodos() {
  list.innerHTML = todoList
    .map(
        (element) =>
        `<li>
            <input 
            type="checkbox"
            ${element.completed ? "checked" : ""}
            onclick="toggleCompleted(${element.id}"
            />
            <span style="text-decoration : ${element.completed ? "line-through" : "none"};">
            ${element.task}
            </span>
            ${element.task}
            <button class="todo__delete" onclick="deleteTodo(${element.id})">
          x
            </button>
        </li>`,
  )
  .join("");
}
