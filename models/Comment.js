const { DataTypes, define } = require('sequelize');
const client = require('../config/connection');
const bcrypt = require('bcrypt');

const Comment = client.define ('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Post',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      client,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );


module.exports = Comment;