const Sequelize = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(
  config.heroku.DB,
  config.heroku.USER,
  config.heroku.PASSWORD,
  {
    host: config.heroku.HOST,
    dialect: 'mysql',
    operatorsAliases: 0
  }
);

const User = require('./user')(sequelize, Sequelize);
const Role = require('./role')(sequelize, Sequelize);
const Customer = require('./customer')(sequelize, Sequelize);
const Invoice = require('./invoice')(sequelize, Sequelize);

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

Customer.hasMany(Invoice, { foreignKey: 'customerId' });
Invoice.belongsTo(Customer, { foreignKey: 'customerId' });

async function initial() {
  try {
    await Role.create({
      id: 1,
      name: 'staff'
    });

    await Role.create({
      id: 2,
      name: 'lead'
    });

    await Role.create({
      id: 3,
      name: 'director'
    });
  } catch (error) {
    return error.message;
  }
}

sequelize.sync()
  .then(() => initial());

module.exports = {
  sequelize,
  User,
  Role,
  Customer,
  Invoice
};
