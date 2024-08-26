const { DataTypes, define } = require('sequelize');
const client = require('../config/connection');


const Post = client.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
}
}, 
{
    client,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'

})


module.exports = Post

