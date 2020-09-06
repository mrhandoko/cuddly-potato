const express = require('express');

const authRouter = express.Router();
const { verifySignUp } = require('../middlewares');
const Controller = require('../controllers');

authRouter.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], Controller.auth.signup);
authRouter.post('/signin', Controller.auth.signin);

module.exports = authRouter;
