const { Sequelize } = require('sequelize');
const config = require('./config/database');

const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port || 3306,
  }
);

module.exports = sequelize;