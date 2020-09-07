const {
  Customer
} = require('../models');

const getAllCustomer = async (req, res) => {
  try {
    const result = await Customer.findAll({
      offset: 0,
      limit: 10
    });

    return res.status(200)
      .send({
        statusCode: 200,
        success: true,
        data: result
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const {
    name,
    phone,
    address
  } = req.body;

  try {
    const customer = await Customer.create({
      name,
      phone,
      address
    });

    if (!customer) {
      res.status(400).send({
        statusCode: 400,
        message: 'Create customer failed!'
      });
    }

    return res.status(200).send({
      statusCode: 200,
      success: true,
      message: 'Create customer success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllCustomer,
  createCustomer
};
