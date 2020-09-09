const express = require('express');

const customerRouter = express.Router();
const Controller = require('../controllers');

customerRouter.get('/all', Controller.role.getAllRoles);

module.exports = customerRouter;
