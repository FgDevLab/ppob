const User = require('./user.model.js');
const Token = require('./token.model.js');
const Service = require('./service.model.js');
const Transaction = require('./transaction.model.js');

User.hasMany(Token, { foreignKey: 'user_id' });
User.hasMany(Transaction, { foreignKey: 'user_id' });

Service.hasMany(Transaction, { foreignKey: 'service_code', sourceKey: 'service_code' });

module.exports = {
  User,
  Token,
  Service,
  Transaction,
};
