'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      service_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        collate: 'utf8mb4_unicode_ci',
      },
      service_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      service_icon: {
        type: Sequelize.STRING(255),
        allowNull: true,
        collate: 'utf8mb4_unicode_ci',
      },
      service_tariff: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      issued_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      transaction_type: {
        type: Sequelize.ENUM('TOPUP', 'PAYMENT'),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      service_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
        references: {
          model: 'services',
          key: 'service_code',
        },
        onDelete: 'SET NULL',
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      invoice_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        collate: 'utf8mb4_unicode_ci',
      },
      status: {
        type: Sequelize.ENUM('INITIATED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'INITIATED',
        collate: 'utf8mb4_unicode_ci',
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        collate: 'utf8mb4_unicode_ci',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        collate: 'utf8mb4_unicode_ci',
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
      },
      profile_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        collate: 'utf8mb4_unicode_ci',
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    await queryInterface.addIndex('services', ['service_code'], { unique: true });
    await queryInterface.addIndex('tokens', ['user_id']);
    await queryInterface.addIndex('tokens', ['expires_at']);
    await queryInterface.addIndex('transactions', ['user_id']);
    await queryInterface.addIndex('transactions', ['invoice_number'], { unique: true });
    await queryInterface.addIndex('transactions', ['service_code']);
    await queryInterface.addIndex('transactions', ['created_at']);
    await queryInterface.addIndex('transactions', ['status']);
    await queryInterface.addIndex('users', ['email'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('tokens');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('users');
  },
};
