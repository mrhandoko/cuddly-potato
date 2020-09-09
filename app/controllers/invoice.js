const moment = require('moment');
const {
  Invoice,
  Customer
} = require('../models');

const getAllInvoices = async (req, res) => {
  try {
    const invoice = await Invoice.findAll({
      attributes: ['id', 'invoiceNumber', 'invoiceDate', 'invoiceTotalAmount'],
      include: [{
        model: Customer,
        attributes: ['name']
      }],
      order: [
        ['invoice_date', 'DESC']
      ],
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

const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findOne({
      where: {
        id
      },
      attributes: ['id', 'invoiceNumber', 'invoiceDate', 'invoiceTotalAmount'],
      include: [{
        model: Customer
      }],
      order: [
        ['invoice_date', 'DESC']
      ],
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
    customerName,
    customerPhone,
    customerAddress,
    invoiceNumber,
    invoiceTotalAmount
  } = req.body;

  try {
    let customer = await Customer.findOne({
      where: {
        name: customerName,
        phone: customerPhone,
      }
    });

    if (!customer) {
      customer = await Customer.create({
        name: customerName,
        phone: customerPhone,
        address: customerAddress
      });
    }

    const invoice = await Invoice.create({
      invoiceNumber,
      invoiceDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      invoiceTotalAmount,
      customerId: customer.id
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

const createInvoiceByCustId = async (req, res) => {
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
    id
  } = req.body;

  try {
    const invoice = await Invoice.findOne({
      where: {
        id
      }
    });

    if (!invoice) {
      res.status(404).send({
        statusCode: 404,
        message: 'Invoice not found!'
      });
    }

    const result = await Invoice.update({
      invoiceNumber,
      invoiceDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      invoiceTotalAmount
    }, {
      where: { id }
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
    id
  } = req.params;

  try {
    await Invoice.destroy({
      where: { id }
    });

    return res.status(200).send({
      statusCode: 200,
      success: true,
      message: 'delete invoice success'
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  createInvoiceByCustId,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoiceById
};
