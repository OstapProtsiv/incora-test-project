const { Router } = require('express');
const userRouter = require('./users/user.router');

const router = new Router();

router.use('/', userRouter);

module.exports = router;
