const express = require('express');
const courseRouter = require('./routes/courses');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth').router;

const router = express.Router();

router.use('/courses', courseRouter);
router.use('/users', userRouter);
router.use('/login', authRouter);

module.exports = router;