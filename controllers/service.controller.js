const serviceService = require('../services/service.service.js');
const { ResponseFormatter } = require('../utils/response.js');

const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAll();
        return ResponseFormatter.success(res, 'Services retrieved successfully', services);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

module.exports = {
    getAllServices,
};
