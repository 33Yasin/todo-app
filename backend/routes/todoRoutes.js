import express from "express";
import {
  getTodos,
  createNewTodo,
  updateExistingTodo,
  removeTodo,
} from "../controllers/todoController.js";

// Create an Express router instance
const router = express.Router();

// Define routes and map them to the corresponding controller functions
router.get("/", getTodos);
router.post("/", createNewTodo);
router.put("/:id", updateExistingTodo);
router.delete("/:id", removeTodo);

export default router;
