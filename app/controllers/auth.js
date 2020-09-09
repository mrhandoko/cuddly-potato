const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const {
  User,
  Role
} = require('../models');
const config = require('../config/auth');

const { Op } = Sequelize;

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });

      await user.setRoles(roles);
      res.json({
        statusCode: 200,
        success: true,
        message: 'User was registered successfully!'
      });
    } else {
      await user.setRoles([1]);
      res.json({
        statusCode: 200,
        success: true,
        message: 'User was registered successfully!'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push(roles[i].name);
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      },
      message: 'login success'
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Login failed'
    });
  }
};

module.exports = {
  signup,
  signin
};
