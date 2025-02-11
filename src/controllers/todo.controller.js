export let todos = [
  {
    id: "todo-0",
    message: "todo-something",
    isDone: false,
  },
];

export function getTodos(_, res) {
  res.status(200).json(todos);
}

export function getTodoById(req, res) {
  const todo = todos.filter(({ id }) => id === req.params.id)[0];

  res.status(200).json(todo);
}

export function createTodo(req, res) {
  const newTodo = {
    id: `todo-${todos.length}`,
    message: req.validatedTodoMessage,
    isDone: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

export function updateTodo(req, res) {
  let todo;

    for (let i = 0; i < todos.length; i++){
      if (todos[i].id === req.todo.id) {
          todos[i] = {
            ...todos[i],
            ...req.validatedUpdateTodo,
          };

        todo = todos[i];
        break;
      }
  }

  res.status(200).json(todo);
};

export function deleteTodo(req, res) {
  todos = todos.filter(({ id }) => id !== req.todo.id);
    
  res.status(200).json();
};
