import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) return <p>No todos yet.</p>;

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-sections">
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