const { Transaction, User, Service } = require('../models');

const transactionService = {
    topup: async (userId, amount) => {
        const transaction = await Transaction.create({
            user_id: userId,
            transaction_type: 'TOPUP',
            total_amount: amount,
            status: 'COMPLETED'
        });
        return transaction;
    },

    payment: async (userId, serviceCode) => {
        const service = await Service.findOne({ where: { service_code: serviceCode } });

        if (!service) {
            throw new Error('Service not found');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.balance < service.service_tariff) {
            throw new Error('Insufficient balance');
        }

        const transaction = await Transaction.create({
            user_id: userId,
            transaction_type: 'PAYMENT',
            service_code: serviceCode,
            total_amount: service.service_tariff,
            status: 'COMPLETED'
        });

        return transaction;
    },

    getAll: async (userId) => {
        const transactions = await Transaction.findAll({
            where: { user_id: userId }
        });
        return transactions;
    }
};

module.exports = transactionService;
