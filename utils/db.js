const knex = require('knex');
const dbConfig = require('../config/db.config.js');

const connection = knex({
  client: 'mysql',
  connection: {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  },
  pool: {
    min: 0,
    max: 7,
  },
});
module.exports = connection;
