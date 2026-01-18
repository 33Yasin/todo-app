export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.title}</span>

      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        🗑
      </button>
    </li>
  );
}
