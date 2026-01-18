import pkg from "pg";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

const { Pool } = pkg;

// Create a new pool instance to manage PostgreSQL connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the database connection
pool
  .connect()
  .then(() => console.log("✅ PostgreSQL connection successful"))
  .catch((err) => console.log("❌ Database connection error:", err));

export default pool;
