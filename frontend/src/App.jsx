import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todoApi.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

export default function App() {
  // State to store the list of todos and any error messages
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // Load todos when the component mounts
  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  // Handler to add a new todo item
  const handleAdd = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      // Add the new todo to the beginning of the list
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handler to toggle the completion status of a todo
  const handleToggle = async (id, completed) => {
    try {
      const updated = await updateTodo(id, { completed });
      // Update the specific todo in the state
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handler to delete a todo item
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      // Remove the deleted todo from the state
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>📝 Todo List</h1>
      {/* Display error message if it exists */}
      {error && <p className="error">{error}</p>}

      {/* Form to add new todos */}
      <TodoForm onAdd={handleAdd} />

      {/* List to display todos */}
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
