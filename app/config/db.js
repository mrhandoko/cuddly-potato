// module.exports = {
//   HOST: 'localhost',
//   USER: 'root',
//   PASSWORD: '123456',
//   DB: 'kredivo',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   }
// };

// mysql://b4774505d0fdff:91c72f6f@us-cdbr-east-02.cleardb.com/heroku_c0cb4a3f403a276?reconnect=true
// mysql --host=us-cdbr-east-02.cleardb.com
// --user=b4774505d0fdff
// --password=91c72f6f --reconnect heroku_c0cb4a3f403a276

module.exports = {
  HOST: 'us-cdbr-east-02.cleardb.com',
  USER: 'b4774505d0fdff',
  PASSWORD: '91c72f6f',
  DB: 'heroku_c0cb4a3f403a276',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
