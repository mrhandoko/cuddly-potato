module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define('invoices', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoiceNumber: {
      type: Sequelize.STRING,
      field: 'invoice_no'
    },
    invoiceDate: {
      type: Sequelize.DATE,
      field: 'invoice_date'
    },
    invoiceTotalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      field: 'invoice_total_amount'
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    underscored: true
  });

  return Invoice;
};
