const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to kredivo fullstack test' });
});

const Routes = require('./app/routes');

app.use('/auth', Routes.auth);
app.use('/customers', Routes.customer);
app.use('/invoices', Routes.invoice);
app.use('/reports', Routes.report);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => true);
