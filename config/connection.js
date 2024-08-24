const { Sequelize } = require('sequelize');

const client = process.env.DB_URL ? new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}) : new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USERNAME,
  process.env.LOCAL_DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});



module.exports = client;