require('dotenv').config();
const express = require('express');
const path = require('path');
const { initDB, getPool } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   HEALTH CHECK
========================= */
app.get('/health', (req, res) => {
  res.status(200).json({ status: "healthy" });
});

/* =========================
   GET ALL NOTES
========================= */
app.get('/notes', async (req, res, next) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, content, created_at FROM notes ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

/* =========================
   CREATE NOTE
========================= */
app.post('/notes', async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    const pool = getPool();
    const [result] = await pool.query(
      "INSERT INTO notes (content) VALUES (?)",
      [content]
    );

    res.status(201).json({
      id: result.insertId,
      content
    });

  } catch (error) {
    next(error);
  }
});

/* =========================
   DELETE NOTE
========================= */
app.delete('/notes/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const pool = getPool();

    const [result] = await pool.query(
      "DELETE FROM notes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });

  } catch (error) {
    next(error);
  }
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* =========================
   START SERVER
========================= */
async function startServer() {
  await initDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();