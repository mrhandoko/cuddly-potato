const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const Models = require('../models');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({
      statusCode: 401,
      error: 'Bad Request',
      message: 'Missing Authentication'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        statusCode: 401,
        error: 'Bad Request',
        message: 'Unauthorized'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isStaff = async (req, res, next) => {
  const user = await Models.User.findAll({
    include: [Models.Role],
    where: { id: req.userId },
    raw: true
  });

  if (user['roles.name'] === 'staff') {
    next();
    return;
  }

  res.status(403).send({
    message: 'Only staff allowed'
  });
};

const isLead = async (req, res, next) => {
  const user = await Models.User.findAll({
    include: [Models.Role],
    where: { id: req.userId },
    raw: true
  });

  if (user['roles.name'] === 'lead') {
    next();
    return;
  }

  res.status(403).send({
    message: 'Only lead allowed'
  });
};

const isStaffOrLead = async (req, res, next) => {
  const user = await Models.User.findAll({
    include: [Models.Role],
    where: { id: req.userId },
    raw: true
  });

  if (user['roles.name'] !== 'director') {
    next();
    return;
  }

  res.status(403).send({
    message: 'Only staff and lead allowed'
  });
};

const isDirector = async (req, res, next) => {
  const user = await Models.User.findOne({
    include: [Models.Role],
    where: { id: req.userId },
    raw: true
  });

  if (user['roles.name'] === 'director') {
    next();
    return;
  }

  res.status(403).send({
    message: 'Only director allowed'
  });
};

module.exports = {
  verifyToken,
  isStaff,
  isLead,
  isStaffOrLead,
  isDirector
};
