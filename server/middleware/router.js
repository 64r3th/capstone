const express = require('express');
const courseRouter = require('./routes/courses');
const userRouter = require('./routes/users')

const router = express.Router();

router.use('/courses', courseRouter)
router.use('/users', userRouter)

module.exports = router;