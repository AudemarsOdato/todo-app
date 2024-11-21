const form     = document.querySelector("form");
const input    = document.querySelector("[name = 'todo']");
const todoList = document.getElementById("todos");

// Onload
getExistingTodos();

function addTodo(todo) {
        createListElement(todo);

        input.value = "";

        saveToStorage();
}

function addToList(todo) {
        createListElement(todo);
}

function createListElement(todo) {
        const li = document.createElement("li");
        li.textContent = todo;
        todoList.appendChild(li);

        const doneButton = document.createElement("button");
        doneButton.id = "doneButtons"
        doneButton.textContent = "Done";
        li.appendChild(doneButton);
        doneButton.addEventListener("click", function() {
                todoList.removeChild(li);
                saveToStorage();
        })
}

function saveToStorage() {
        const todoData = [];
        let list = todoList.querySelectorAll("li")
        list.forEach(todo => {
                todoData.push(todo.textContent.replace("Done", ""));
        })
        localStorage.setItem("todos", JSON.stringify(todoData));
}

function getExistingTodos() {
        const existingTodos = JSON.parse(localStorage.getItem("todos"));
        existingTodos.forEach(addToList)
}

form.onsubmit = (event) => {
        event.preventDefault();
        addTodo(input.value);
}