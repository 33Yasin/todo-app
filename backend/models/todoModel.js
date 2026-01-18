import pool from "../config/db.js";

// Function to initialize the database table
const init = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  // Execute the table creation query
  await pool.query(sql);
};
// Run the initialization function
init();

// Fetch all todos from the database, ordered by ID in descending order
export const getAllTodos = async () => {
  const res = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return res.rows;
};

// Fetch a single todo by its ID
export const getTodosById = async (id) => {
  const res = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
  return res.rows[0];
};

// Insert a new todo into the database and return the created row
export const createTodo = async (title) => {
  const res = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title],
  );
  return res.rows[0];
};

// Update an existing todo using COALESCE to handle partial updates
export const updateTodo = async (id, { title, completed }) => {
  const res = await pool.query(
    `UPDATE todos
         SET title = COALESCE($1, title),
         completed = COALESCE($2, completed)
        WHERE id = $3 RETURNING *`,
    [title, completed, id],
  );
  return res.rows[0];
};

// Delete a todo from the database by its ID
export const deleteTodo = async (id) => {
  await pool.query("DELETE FROM todos WHERE id=$1", [id]);
};
