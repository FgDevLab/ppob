class ResponseFormatter {
    static #createResponse(status, message, data = null, meta = null, errors = null) {
        const response = {
            status,
            message,
            ...(data && { data }), 
            ...(meta && { meta }), 
            ...(errors && { errors }), 
        };

        return response;
    }

    static success(res, message, data = null, meta = null) {
        const response = this.#createResponse(true, message, data, meta);
        return res.status(200).json(response);
    }

    static error(res, message, statusCode = 400, errors = null) {
        const response = this.#createResponse(false, message, null, null, errors);
        return res.status(statusCode).json(response);
    }

    static created(res, message, data = null) {
        const response = this.#createResponse(true, message, data);
        return res.status(201).json(response);
    }

    static accepted(res, message = 'Request accepted') {
        return res.status(202).json(this.#createResponse(true, message));
    }

    static noContent(res, message = 'No content') {
        return res.status(204).json(this.#createResponse(true, message));
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }

    static unauthorized(res, message = 'Unauthorized access') {
        return this.error(res, message, 401);
    }

    static forbidden(res, message = 'Forbidden access') {
        return this.error(res, message, 403);
    }

    static validation(res, errors) {
        return this.error(res, 'Validation failed', 422, errors);
    }

    static conflict(res, message = 'Conflict occurred') {
        return this.error(res, message, 409);
    }

    static gone(res, message = 'Resource no longer available') {
        return this.error(res, message, 410);
    }

    static unprocessableEntity(res, message = 'Unprocessable entity') {
        return this.error(res, message, 422);
    }

    static paginatedSuccess(res, message, data, pagination) {
        const response = this.#createResponse(true, message, data, {
            current_page: pagination.page,
            per_page: pagination.limit,
            total_pages: Math.ceil(pagination.total / pagination.limit),
            total_items: pagination.total,
        });
        return res.status(200).json(response);
    }
}

module.exports = { ResponseFormatter }