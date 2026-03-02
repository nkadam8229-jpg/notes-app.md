const mysql = require('mysql2/promise');

let pool;

async function initDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL Database");
    connection.release();

  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
}

function getPool() {
  if (!pool) {
    throw new Error("Database not initialized.");
  }
  return pool;
}

module.exports = {
  initDB,
  getPool
};