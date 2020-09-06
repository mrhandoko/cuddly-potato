const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const User = require('../models');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isStaff = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'staff') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Only staff allowed'
    });
  }
};

const isLead = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'lead') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Only lead allowed'
    });
  }
};

const isDirector = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'director') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Only lead allowed'
    });
  }
};

module.exports = {
  verifyToken,
  isStaff,
  isLead,
  isDirector
};
