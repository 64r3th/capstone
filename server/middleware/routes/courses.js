const express = require("express");
const db = require('../db/db');
const database = "courses"
const router = express.Router();

router.post('/postData', async (request, response) => {
  const { course_id, course_name } = request.body;
  if (!course_id || !course_name) {
    return response.status(400).send('Missing required fields: course_id and course_name');
  }   // validate body
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); // 10 second timeout
  const insert_query = `INSERT INTO ${database} (course_id, course_name) VALUES ($1, $2)`;
  try {
    const result = await db.query({ text: insert_query, values: [course_id, course_name], timeout: 5000 });
    response.status(201).send('Data posted successfully');
  } catch (err) {
    console.error('Database error:', err);
    if (err.code === '23505') {
      return response.status(409).send('Course with this ID already exists');
    } // 409 error
    response.status(500).send('Database query failed');
  }
});

router.get('/fetchData', async (request, response) => {
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); //10 second timeout
  const fetch_query = `SELECT * FROM ${database}`;
  try {
    const result = await db.query({ text: fetch_query, timeout: 5000 });
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

router.get('/fetchbyID/:course_id', async (request, response) => {
  const { course_id } = request.params;
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); //10 second timeout
  const fetch_query = `SELECT * FROM ${database} WHERE course_id = $1`;
  try {
    const result = await db.query({text: fetch_query, values:[course_id], timeout: 5000});
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

router.put('/update/:course_id', async (request, response) => {
  const { course_id } = request.params;
  const { course_name } = request.body;
  if (!course_id || !course_name) {
    return response.status(400).send('Missing required fields: course_id and course_name');
  }   // Validate request body
  request.setTimeout(10000, () => {
    response.status(504).send('Request timeout');
  }); // 10 second timeout
  const update_query = `UPDATE ${database} SET course_name = $1 WHERE course_id = $2`;
  try {
    const result = await db.query({ text: update_query, values: [course_name, course_id], timeout: 5000 });
    if (result.rowCount > 0) {
      response.status(200).send('Course updated successfully');
    } else {
      response.status(404).send('Course not found');
    } // 404 ERROR
  } catch (error) {
    console.error('Database error:', error);
    response.status(500).send('Database query failed');
  }
});

router.delete('/delete/:course_id', async (req, res) => {
  const { course_id } = req.params;
  if (!course_id) {
    return res.status(400).send('Missing required parameter: course_id');
  }   // Validate request

  req.setTimeout(10000, () => {
    res.status(504).send('Request timeout');
  }); // 10 second timeout
  const delete_query = `DELETE FROM ${database} WHERE course_id = $1`;
  try {
    const result = await db.query({ text: delete_query, values: [course_id], timeout: 5000 });
    if (result.rowCount > 0) {
      res.status(200).send('Course deleted successfully');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database query failed');
  }
});

module.exports = router;
