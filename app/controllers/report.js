const DB = require('../models');
// SELECT *
// FROM invoices a
// INNER JOIN customers
// WHERE invoice_date = (
//    SELECT MAX( invoice_date )
//    FROM invoices b
//    WHERE a.customer_id = b.customer_id
// )

const getAllReports = async (req, res) => {
  try {
    const result = await DB.sequelize.query(
      'SELECT * FROM invoices a '
      + 'LEFT JOIN customers c ON a.customer_id = c.id '
      + 'WHERE invoice_date = ('
      + 'SELECT MAX( invoice_date ) '
      + 'FROM invoices b '
      + 'WHERE a.customer_id = b.customer_id)',
      { type: DB.sequelize.QueryTypes.SELECT }
    );

    if (!result) {
      res.status(400).send({
        statusCode: 400,
        message: 'get last transaction failed'
      });
    }

    return res.status(200).send({
      statusCode: 200,
      success: true,
      data: result,
      message: 'get list reports success'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllReports
};
