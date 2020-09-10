const express = require('express');

const reportRouter = express.Router();
const Middleware = require('../middlewares');
const Controller = require('../controllers');

reportRouter.get('/all',
  [
    Middleware.authJwt.verifyToken
  ],
  Controller.report.getAllReports);

module.exports = reportRouter;
