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
app.use((req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to kredivo fullstact test' });
});

const Routes = require('./app/routes');

app.use('/auth', Routes.auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => true);
