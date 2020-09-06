const Sequelize = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true
    }
  }
);

sequelize.sync();

const User = require('./user')(sequelize, Sequelize);
const Role = require('./role')(sequelize, Sequelize);

Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});

User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});

module.exports = {
  User,
  Role
};
