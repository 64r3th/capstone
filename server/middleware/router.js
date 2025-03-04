const express = require('express');
const db = require('../db/db');

const router = express.Router();

//db
router.get("/db", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/db/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//webpages
router.get('/register', (req, res) => {
  res.send('register');
});
router.get('/manage', (req, res) => {
  res.send('manage');
});
router.get('/courses', (req, res) => {
  res.send('courses');
});
router.get('/admin', (req, res) => {
  res.send('admin');
});
router.get('/students', (req, res) => {
  res.send('students');
});

module.exports = router;