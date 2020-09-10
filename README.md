# Kredivo Test Backend

Run in local development
```
- create db named kredivo on local mysql
- npm install && npm run dev
```

note: change config db before run local on `./app/models/index.js` 
```
...
const sequelize = new Sequelize(
  config.local.DB,
  config.local.USER,
  config.local.PASSWORD,
  {
    host: config.local.HOST,
    dialect: 'mysql',
    operatorsAliases: 0
  }
);
...
```

API on Heroku

`Backend App on Heroku: https://kredivo-backend.herokuapp.com`

note: change config db before run heroku on `./app/models/index.js` 
```
...
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
...

```
1. Login
- https://kredivo-backend.herokuapp.com/auth/signin

- role staff
payload: {
  "username": "test",
  "password": "123456"
}

- role lead
payload: {
  "username": "lisa",
  "password": "123456"
}

- role director
payload: {
  "username": "danang",
  "password": "123456"
}

2. Get All Invoices
curl --location --request GET 'https://kredivo-backend.herokuapp.com/invoices/all' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzE1MDQzLCJleHAiOjE1OTk4MDE0NDN9.5apmQprIf4lxmYRwDnfAHr8wEagleTEK6w5T5gWv-88'

3. Create Invoice
curl --location --request POST 'https://kredivo-backend.herokuapp.com/invoices/create' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzE1MDQzLCJleHAiOjE1OTk4MDE0NDN9.5apmQprIf4lxmYRwDnfAHr8wEagleTEK6w5T5gWv-88' \
--header 'Content-Type: application/json' \
--data-raw '{
    "customerName": "Megan Fox",
    "customerPhone": "088911115555",
    "customerAddress": "Colorado",
    "invoiceNumber": "INV0001",
    "invoiceTotalAmount": 321.22
}'

4. Update Invoice
curl --location --request PUT 'https://kredivo-backend.herokuapp.com/invoices/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzE1MDQzLCJleHAiOjE1OTk4MDE0NDN9.5apmQprIf4lxmYRwDnfAHr8wEagleTEK6w5T5gWv-88' \
--header 'Content-Type: application/json' \
--data-raw '{
    "invoiceNumber": "INV0001",
    "invoiceTotalAmount": 301.22,
    "id": 1
}'

5. Get Invoice By ID
curl --location --request GET 'https://kredivo-backend.herokuapp.com/invoices/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzE1MDQzLCJleHAiOjE1OTk4MDE0NDN9.5apmQprIf4lxmYRwDnfAHr8wEagleTEK6w5T5gWv-88'

6. Delete Invoice
curl --location --request DELETE 'https://kredivo-backend.herokuapp.com/invoices/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzE1MDQzLCJleHAiOjE1OTk4MDE0NDN9.5apmQprIf4lxmYRwDnfAHr8wEagleTEK6w5T5gWv-88'

7. List Report
curl --location --request GET 'https://kredivo-backend.herokuapp.com/reports/all' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTU5OTcxODEyNCwiZXhwIjoxNTk5ODA0NTI0fQ.aWJ_GC7CycbhWg1aiUfuBz63hvOZfFylw4fybi6Qvps'

8. Signup User
curl --location --request POST 'https://kredivo-backend.herokuapp.com/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "danang",
    "email": "danang@mailinator.com",
    "password": "123456",
    "roles": ["director"]
}' 

```

