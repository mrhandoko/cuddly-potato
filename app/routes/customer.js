const express = require('express');

const customerRouter = express.Router();
const Controller = require('../controllers');

customerRouter.get('/all', Controller.customer.getAllCustomer);
customerRouter.post('/create', Controller.customer.createCustomer);

module.exports = customerRouter;
