import { todos } from "../controllers/todo.controller.js";
import { catchError } from "../utils/helperFunctions.js";
import { createTodoValidator, updateTodoValidator } from "../validators/todo.validator.js";

export const getTodoById = (req, res, next) => {
  const todo = todos.find(({ id }) => id === req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  req.todo = todo;

  next();
};

export const validateCreateTodoBody = catchError(async (req, _) => {
    const { message } = await createTodoValidator.validate(req.body);
  
    req.validatedTodoMessage = message;
});

export const validateUpdateTodoBody = catchError(async (req, _) => {
  const validatedUpdateTodo = await updateTodoValidator.validate(req.body);

  req.validatedUpdateTodo = validatedUpdateTodo;
});