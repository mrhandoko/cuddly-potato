const moment = require('moment');
const {
  Invoice
} = require('../models');

const getAllInvoices = async (req, res) => {
  try {
    const invoice = await Invoice.findAll({
      offset: 0,
      limit: 50
    });

    if (!invoice) {
      res.status(400).send({
        statusCode: 400,
        message: 'get list invoices failed!'
      });
    }

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data: invoice,
      message: 'get list invoices success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createInvoice = async (req, res) => {
  const {
    invoiceNumber,
    invoiceTotalAmount,
    customerId
  } = req.body;

  try {
    const invoice = await Invoice.create({
      invoiceNumber,
      invoiceDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      invoiceTotalAmount,
      customerId
    });

    if (!invoice) {
      res.status(400).send({
        statusCode: 400,
        message: 'create invoice failed!'
      });
    }

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data: invoice,
      message: 'Create invoice success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateInvoice = async (req, res) => {
  const {
    invoiceNumber,
    invoiceTotalAmount,
    customerId,
    invoiceId
  } = req.body;

  try {
    const invoice = await Invoice.update({
      invoiceNumber,
      invoiceDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      invoiceTotalAmount,
      customerId
    }, {
      where: { id: invoiceId }
    });

    if (!invoice) {
      res.status(400).send({
        statusCode: 400,
        message: 'update invoice failed!'
      });
    }

    const result = await Invoice.findOne({
      where: {
        id: invoiceId
      }
    });

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data: result,
      message: 'Update customer success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  const {
    invoiceId
  } = req.body;

  try {
    await Invoice.destroy({
    }, {
      where: { id: invoiceId }
    });

    return res.status(200).send({
      statusCode: 200,
      success: true,
      message: 'delete invoice success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
};
