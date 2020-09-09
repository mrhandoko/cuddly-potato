const {
  Role
} = require('../models');

const getAllRoles = async (req, res) => {
  try {
    const result = await Role.findAll({
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
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getAllRoles };
