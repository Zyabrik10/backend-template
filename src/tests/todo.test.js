import { todos } from "../controllers/todo.controller";

function getAllTodos() {
  return fetch("http://localhost:3000/todos/").then((res) => res.json());
}

function getTodoById(id) {
  return fetch(`http://localhost:3000/todos/${id}`).then((res) => res.json());
}

function createTodo(body) {
  return fetch("http://localhost:3000/todos/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function updateTodo(id, body) {
  return fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function deleteTodo(id) {
  return fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
}

test("get all todos", async () => {
  const data = await getAllTodos();
  expect(data).toEqual(todos);
});

test("get todo by id", async () => {
  const data = await getTodoById("todo-0");
  expect(data).toEqual(todos[0]);
});

test("get todo by false id", async () => {
  const data = await getTodoById("todo-1");
  expect(data).toEqual({
    message: "Todo not found",
  });
});

test("create todo", async () => {
  const data = await createTodo({
    message: "new todo",
  });

  expect(data).toEqual((await getAllTodos()).at(-1));
});

test("create todo with empty body", async () => {
  const data = await createTodo({});

  expect(data).toEqual({
    message: "Validation failure",
    description: {
      message: "The message field must be defined",
      rule: "required",
      field: "message",
    },
  });
});

test("create todo with unnecessary field", async () => {
  const data = await createTodo({
    message: "unnecessary field todo",
    unnecessary: "field",
  });

  expect(data).toEqual((await getAllTodos()).at(-1));
});

test("create todo with message field being not string", async () => {
  const data = await createTodo({
    message: true,
  });

  expect(data).toEqual({
    message: "Validation failure",
    description: {
      message: "The message field must be a string",
      rule: "string",
      field: "message",
    },
  });
});

test("update todo", async () => {
  const data = await updateTodo("todo-1", {
    message: "todo-is-changed",
    isDone: true,
  });

  expect(data).toEqual(await getTodoById("todo-1"));
});

test("update todo with isDone not being bool", async () => {
  const data = await updateTodo("todo-1", {
    isDone: "zdkspkmc",
  });

  expect(data).toEqual({
    message: "Validation failure",
    description: {
      message: "The value must be a boolean",
      rule: "boolean",
      field: "isDone",
    },
  });
});

test("update todo with message field not being string", async () => {
  const data = await updateTodo("todo-1", {
    isDone: true,
    message: true,
  });

  expect(data).toEqual({
    message: "Validation failure",
    description: {
      message: "The message field must be a string",
      rule: "string",
      field: "message",
    },
  });
});

test("delete todo", async () => {
  let todos = await getAllTodos();
  todos = todos.filter(({ id }) => id !== "todo-1");

  await deleteTodo("todo-1");

  expect(await getAllTodos()).toEqual(todos);
});

test("delete todo with wrong id", async () => {
  let todos = await getAllTodos();
  todos = todos.filter(({ id }) => id !== "wrong-id");

  await deleteTodo("todo-1");

  expect(await getAllTodos()).toEqual(todos);
});
