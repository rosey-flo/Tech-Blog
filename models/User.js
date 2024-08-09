const { DataTypes, define } = require('sequelize');
const client = require('../config/connection');
const bcrypt = require('bcrypt');


const User = client.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 6
        }
    }
}, 
{
    client,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'

})

module.exports = User