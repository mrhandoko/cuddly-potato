module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    underscored: true
  });

  return Customer;
};
