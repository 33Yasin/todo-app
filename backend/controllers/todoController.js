import {
  getAllTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../models/todoModel.js";

// Controller to get all todo items
export const getTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to create a new todo item
export const createNewTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const newTodo = await createTodo(title);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to update an existing todo item
export const updateExistingTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updated = await updateTodo(req.params.id, { title, completed });
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to remove a todo item
export const removeTodo = async (req, res) => {
  try {
    await deleteTodo(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
