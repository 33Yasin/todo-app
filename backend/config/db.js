// config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Bağlantı test
pool
  .connect()
  .then(() => console.log('✅ PostgreSQL bağlantısı başarılı'))
  .catch((err) => console.log('❌ Veritabanı bağlantı hatası:', err));

export default pool;