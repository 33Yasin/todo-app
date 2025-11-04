import express from "express";
import { getTodos, createNewTodo, updateExistingTodo, removeTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createNewTodo);
router.put("/:id", updateExistingTodo);
router.delete("/:id", removeTodo);

export default router;