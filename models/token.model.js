const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.model.js');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  issued_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'tokens',
  timestamps: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['expires_at']
    }
  ]
});

Token.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = Token;
