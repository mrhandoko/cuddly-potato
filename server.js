const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to kredivo fullstack test' });
});

const Routes = require('./app/routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/auth', Routes.auth);
app.use('/customers', Routes.customer);
app.use('/invoices', Routes.invoice);
app.use('/reports', Routes.report);
app.use('/roles', Routes.role);
app.use('/user', Routes.user);

const PORT = process.env.PORT || 4000;
app.set('port', PORT);

app.listen(PORT, () => true);
