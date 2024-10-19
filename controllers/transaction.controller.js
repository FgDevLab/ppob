const transactionService = require('../services/transaction.service.js');
const { ResponseFormatter } = require('../utils/response.js');

const topupTransaction = async (req, res) => {
    const { amount } = req.body;
    try {
        const transaction = await transactionService.topup(req.user.id, amount);
        return ResponseFormatter.success(res, 'Top-up successful', transaction);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const paymentTransaction = async (req, res) => {
    const { service_code } = req.body;
    try {
        const transaction = await transactionService.payment(req.user.id, service_code);
        return ResponseFormatter.success(res, 'Payment successful', transaction);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAll(req.user.id);
        return ResponseFormatter.success(res, 'Transactions retrieved successfully', transactions);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

module.exports = {
    topupTransaction,
    paymentTransaction,
    getTransactions
};
