const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'meetup_db',
  'root',
  '',
  // process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
