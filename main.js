const TODO_LIST_ID = "#todos";
const TODO_INPUT_ID = "#todo-text";
const TODO_TEXT_INPUT = document.querySelector(TODO_INPUT_ID);
const TODOS_LIST_NODE = document.querySelector(TODO_LIST_ID);

let todoListState = {
  filter: "",
  todos: []
};

const saveTodo = () => {
  let todoTextToAdd = TODO_TEXT_INPUT.value;
  let isTodoInList = getTodoByText(todoTextToAdd);
  if (isTodoInList) {
    alert("todo already exists");
  } else {
    addNewTodo(todoTextToAdd);
    TODO_TEXT_INPUT.value = "";
    renderList();
  }
};

const getTodoByText = text =>
  todoListState.todos.find(todo => todo.text === text);

const addNewTodo = text => {
  let newTodo = {
    isCompleted: false,
    text
  };
  todoListState.todos.push(newTodo);
};

const toggleCompleted = e => {
  let todo = getTodoByText(e.target.textContent);
  todo.isCompleted = !todo.isCompleted;
  renderList();
};

const createTodoNode = todo => {
  let todoNode = document.createElement("li");
  todoNode.textContent = todo.text;
  if (todo.isCompleted) {
    todoNode.className = "completed";
  }
  todoNode.addEventListener("click", toggleCompleted);
  return todoNode;
};

const noFilter = () => true;

const renderList = (filter = noFilter) => {
  TODOS_LIST_NODE.innerHTML = "";
  todoListState.todos
    .filter(filter)
    .forEach(todo => TODOS_LIST_NODE.appendChild(createTodoNode(todo)));
};
