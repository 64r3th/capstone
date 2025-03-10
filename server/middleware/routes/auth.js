require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt')
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post('/', async (request, response) => {
  // Authenticate
  const users = await db.query('SELECT * FROM users');
  const { user_name, password } = request.body;
  const findUser = users.rows.find(user => user.user_name === user_name);
  if (findUser === null) return response.sendStatus(400);
  try {
    if (await bcrypt.compare(password, findUser.password_hash)) {
      //JWT
      const user = {user_id: findUser.user_id, user_name, is_admin: findUser.is_admin};
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      response.json({accessToken});
    } else {
      response.send('Not allowed');
    }
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
});

function authenticateToken(request, response, next) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return response.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return response.sendStatus(403);
    request.user = user;
    next();
  });
}

exports.router = router;
exports.authenticateToken = authenticateToken;