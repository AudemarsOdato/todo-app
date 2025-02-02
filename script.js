const form     = document.querySelector("form");
const input    = document.querySelector("[name = 'todo']");
const todoList = document.getElementById("todos");

// Onload
if (!(localStorage.getItem("todos") === null)) {
        getExistingTodos();
}

function addTodo(todo) {
        createListElement(todo);

        input.value = "";

        saveToStorage();
}

function addToList(todo) {
        createListElement(todo);
}

function createListElement(todo) {

        const marker = document.createElement("div");
        todoList.appendChild(marker);
        marker.classList.add("list");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        marker.appendChild(checkbox);
        
        const li = document.createElement("li");
        li.textContent = todo;
        marker.appendChild(li);

        const removeButton = document.createElement("button");
        removeButton.id = "removeButton"
        removeButton.textContent = "Remove";
        li.appendChild(removeButton);
        removeButton.addEventListener("click", function() {
                todoList.removeChild(marker);
                saveToStorage();
        });

        checkbox.addEventListener("click", () => {
                if (checkbox.checked == true) {
                        li.style.textDecoration = "line-through";
                        li.style.color = "rgb(239, 136, 255)";
                        li.style.textDecorationColor = "rgb(239, 136, 255)";
                }
                else if (checkbox.checked == false) {
                        li.style.textDecoration = "none";
                        li.style.color = "rgb(255, 255, 255)";
                }
        });
}

function saveToStorage() {
        const todoData = [];
        let list = todoList.querySelectorAll("li")
        list.forEach(todo => {
                todoData.push(todo.textContent.replace("Remove", ""));
        })
        localStorage.setItem("todos", JSON.stringify(todoData));
}

function getExistingTodos() {
        const existingTodos = JSON.parse(localStorage.getItem("todos"));
        existingTodos.forEach(addToList)
}

form.onsubmit = (event) => {
        event.preventDefault();

        if (input.value) {
                addTodo(input.value);
        }
        else {
                alert("One must first know what one self wants.");
        }
}
