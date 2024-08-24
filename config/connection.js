const {Sequelize} = require('sequelize');
//Sequelize's cleint connection constructor

//Create a new instance object of sequelize called client
const client = new Sequelize({
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    },
    host: 'localhost',
    logging:false,
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME
})

module.exports = client;