const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.model.js');
const Service = require('./service.model.js');

const Transaction = sequelize.define('Transaction', {
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
  transaction_type: {
    type: DataTypes.ENUM('TOPUP', 'PAYMENT'),
    allowNull: false
  },
  service_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    references: {
      model: 'services',
      key: 'service_code'
    }
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  invoice_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('INITIATED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'),
    allowNull: false,
    defaultValue: 'INITIATED'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      unique: true,
      fields: ['invoice_number']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['status']
    }
  ],
  hooks: {
    beforeValidate: async (transaction) => {
      if (!transaction.invoice_number) {
        transaction.invoice_number = await generateInvoiceNumber(transaction);
      }
    },
    afterCreate: async (transaction) => {
      if (transaction.status === 'COMPLETED') {
        await updateUserBalance(transaction);
      }
    },
    afterUpdate: async (transaction) => {
      if (transaction.changed('status') && transaction.status === 'COMPLETED') {
        await updateUserBalance(transaction);
      }
    }
  }
});

async function generateInvoiceNumber(transaction) {
  const prefix = transaction.transaction_type === 'TOPUP' ? 'TOP' : 'TRX';
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}/${date}/${random}`;
}

async function updateUserBalance(transaction) {
  const user = await User.findOne({
    where: { id: transaction.user_id }
  });

  if (!user) {
    throw new Error('user record not found');
  }

  const amount = transaction.transaction_type === 'TOPUP' 
    ? transaction.total_amount 
    : -transaction.total_amount;

  await user.increment('balance', { by: amount });
}

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Service, {
  foreignKey: 'service_code',
  targetKey: 'service_code',
  onDelete: 'SET NULL'
});

module.exports = Transaction;
