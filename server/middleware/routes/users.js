const express = require('express');
const bcrypt = require('bcrypt')
const database = "users";
const db = require('../db/db');
const authenticateToken = require('./auth').authenticateToken;
const router = express.Router();

router.post('/post', async (request, response) => {
  const {user_name, password, email, first_name, last_name, phone, address, is_admin } = request.body;
  if (!user_name || !password) {
    return response.status(400).send('Missing required fields: user_name, or password');
  }   // validate body
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); // 10 second timeout
  const insert_query = `INSERT INTO ${database} (user_id, user_name, password_hash, email, first_name, last_name, phone, address, is_admin) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)`;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await db.query({ text: insert_query, values: [user_name, password_hash, email, first_name, last_name, phone, address, is_admin || false], timeout: 5000 });
    response.status(201).send('Data posted successfully');
  } catch (err) {
    console.error('Database error:', err);
    if (err.code === '23505') {
      return response.status(409).send('User with this ID already exists');
    } // 409 error
    response.status(500).send('Database query failed');
  }
});

router.get('/get', async (request, response) => {
  if (!request.user.is_admin) return response.sendStatus(403)
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); //10 second timeout
  const fetch_query = `SELECT * FROM ${database}`;
  try {
    const result = await db.query({ text: fetch_query, timeout: 5000 });
    console.log(result);
    if (result.rows.length > 0) {
      response.send(result.rows);
    } else {
      response.status(404).send(`No ${database} found`);
    }
  } catch (error) {
    console.error(`Database error:`, error);
    response.status(500).send(`Database query failed`);
  }
});

router.get('/getbyID/:user_id', authenticateToken, async (request, response) => {
  //authenticate
  if (!request.user.is_admin || !request.user.user_id === request.params.user_id) return response.sendStatus(403)
  const { user_id } = request.params;
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); //10 second timeout
  const fetch_query = `SELECT * FROM ${database} WHERE user_id = $1`;
  try {
    const result = await db.query({text: fetch_query, values:[user_id], timeout: 5000});
    if (result.rows.length > 0) {
      response.send(result.rows[0]);
    } else {
      response.status(404).send('Not Found');
    }
  } catch (error) {
    console.error('Database error:', error);
    response.status(500).send('Database query failed')
  }
});

router.put('/update/:user_id', authenticateToken, async (request, response) => {
  //authenticate
  if (!request.user.is_admin || !request.user.user_id === request.params.user_id) return response.sendStatus(403)
  const { user_id } = request.params;
  const { user_name, password_hash, email, first_name, last_name, phone, address, is_admin } = request.body;
  if (!user_id || !user_name || !password_hash || !email || !first_name || !last_name || !phone || ! address || (is_admin === undefined)) {
    return response.status(400).send('Missing required fields: user_id, user_name, password_hash, email, first_name, last_name, phone, address, or is_admin');
  }   // validate body
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); // 10 second timeout
  const update_query = `UPDATE ${database} SET user_name = $1, password_hash = $2, email = $3, first_name = $4, last_name = $5, phone = $6, address = $7, is_admin = $8 WHERE user_id = $9`;
  try {
    const result = await db.query({ text: update_query, values: [user_name, password_hash, email, first_name, last_name, phone, address, is_admin, user_id], timeout: 5000 });
    if (result.rowCount > 0) {
      response.status(200).send('updated successfully');
    } else {
      response.status(404).send('Not found');
    } // 404 ERROR
  } catch (error) {
    console.error('Database error:', error);
    response.status(500).send('Database query failed');
  }
});

router.delete('/delete/:user_id', authenticateToken, async (req, res) => {
  //authenticate
  if (!request.user.is_admin || !request.user.user_id === request.params.user_id) return response.sendStatus(403)
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).send('Missing required parameter: user_id');
  }   // Validate request
  req.setTimeout(10000, () => {
    res.status(504).send('Request timeout');
  }); // 10 second timeout
  const delete_query = `DELETE FROM ${database} WHERE user_id = $1`;
  try {
    const result = await db.query({ text: delete_query, values: [user_id], timeout: 5000 });
    if (result.rowCount > 0) {
      res.status(200).send('User deleted successfully');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database query failed');
  }
});

module.exports = router;
