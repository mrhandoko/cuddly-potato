const express = require('express');

const invoiceRouter = express.Router();
const Middleware = require('../middlewares');
const Controller = require('../controllers');

invoiceRouter.get('/all',
  [Middleware.authJwt.verifyToken],
  Controller.invoice.getAllInvoices);

invoiceRouter.get('/:id',
  [Middleware.authJwt.verifyToken],
  Controller.invoice.getInvoiceById);

invoiceRouter.post('/create', [
  Middleware.authJwt.verifyToken,
  Middleware.authJwt.isStaff,
], Controller.invoice.createInvoice);

invoiceRouter.put('/:id', [
  Middleware.authJwt.verifyToken
],
Controller.invoice.updateInvoice);

invoiceRouter.delete('/:id',
  [
    Middleware.authJwt.verifyToken
  ],
  Controller.invoice.deleteInvoice);

module.exports = invoiceRouter;
