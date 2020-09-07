const express = require('express');

const invoiceRouter = express.Router();
const Middleware = require('../middlewares');
const Controller = require('../controllers');

invoiceRouter.get('/all', Controller.invoice.getAllInvoices);
invoiceRouter.post('/create', [
  Middleware.authJwt.verifyToken,
  Middleware.authJwt.isStaff,
], Controller.invoice.createInvoice);
invoiceRouter.put('/update', [
  Middleware.authJwt.verifyToken,
  Middleware.authJwt.isStaffOrLead,
],
Controller.invoice.updateInvoice);
invoiceRouter.delete('/delete',
  [
    Middleware.authJwt.verifyToken,
    Middleware.authJwt.isLead
  ],
  Controller.invoice.deleteInvoice);

module.exports = invoiceRouter;
