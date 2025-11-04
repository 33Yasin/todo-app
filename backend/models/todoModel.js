import pool from "../config/db.js";

// tabloyu oluştur
const init = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await pool.query(sql);
};
init();

export const getAllTodos = async () => {
    const res = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    return res.rows;
};

export const getTodosById = async (id) => {
    const res = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
    return res.rows[0];
};

export const createTodo = async (title) => {
    const res = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [title]);
    return res.rows[0];
};

export const updateTodo = async (id, { title, completed }) => {
    const res = await pool.query(
        `UPDATE todos
         SET title = COALESCE($1, title),
         completed = COALESCE($2, completed)
        WHERE id = $3 RETURNING *`,
        [title, completed, id]
    );
    return res.rows[0];
};

export const deleteTodo = async (id) => {
    await pool.query("DELETE FROM todos WHERE id=$1", [id]);
};