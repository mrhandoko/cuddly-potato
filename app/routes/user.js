const express = require('express');

const userRouter = express.Router();
const Middleware = require('../middlewares');
const Controller = require('../controllers');

userRouter.get('/profile', [Middleware.authJwt.verifyToken], Controller.user.profile);

module.exports = userRouter;
