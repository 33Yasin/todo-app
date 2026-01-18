import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  // If there are no todos, display a message
  if (todos.length === 0) return <p>No todos yet.</p>;

  // Filter active and completed todos separately
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="todo-sections">
      {/* Section for active todos */}
      <div className="todo-section">
        <h2>Active</h2>
        <ul className="todo-list">
          {activeTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>

      {/* Section for completed todos (only if there are any) */}
      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2>Completed</h2>
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
