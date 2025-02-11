import express from "express";
import {
  getTodoById,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import {
  getTodoById as getTodoByIdMiddleware,
  validateCreateTodoBody,
  validateUpdateTodoBody,
} from "../middlewares/todo.middleware.js";

const todosRouter = express.Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodoByIdMiddleware, getTodoById);
todosRouter.post("/", validateCreateTodoBody, createTodo);
todosRouter.patch("/:id", getTodoByIdMiddleware, validateUpdateTodoBody, updateTodo);
todosRouter.delete("/:id", getTodoByIdMiddleware, deleteTodo);

export default todosRouter;
