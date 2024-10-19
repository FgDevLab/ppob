const { Service } = require('../models');

const serviceService = {
    getAll: async () => {
        try {
            const services = await Service.findAll();
            return services;
        } catch (error) {
            throw new Error('Error fetching services: ' + error.message);
        }
    }
};

module.exports = serviceService;
