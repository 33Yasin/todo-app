import { useEffect, useState } from 'react';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './api/todoApi.js';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  // Verileri yükle
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

  // Yeni todo ekle
  const handleAdd = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Tamamlandı/tamamlanmadı
  const handleToggle = async (id, completed) => {
    try {
      const updated = await updateTodo(id, { completed });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Silme
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>📝 Todo List</h1>
      {error && <p className="error">{error}</p>}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}