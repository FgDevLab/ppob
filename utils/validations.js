const Joi = require('joi');

const validators = {
  registration: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    first_name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 100 characters',
        'any.required': 'First name is required'
      }),
    last_name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 100 characters',
        'any.required': 'Last name is required'
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        'any.required': 'Password is required'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  updateProfile: Joi.object({
    first_name: Joi.string()
      .min(2)
      .max(100)
      .messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 100 characters'
      }),
    last_name: Joi.string()
      .min(2)
      .max(100)
      .messages({
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 100 characters'
      })
  }),

  payment: Joi.object({
    service_code: Joi.string()
      .required()
      .messages({
        'any.required': 'Service code is required'
      }),
  }),

  topup: Joi.object({
    amount: Joi.number()
      .positive()
      .min(10000)
      .max(1000000)
      .required()
      .messages({
        'number.positive': 'Amount must be a positive number',
        'number.min': 'Minimum top-up amount is 10,000',
        'number.max': 'Maximum top-up amount is 1,000,000',
        'any.required': 'Amount is required'
      })
  })
};

module.exports = { validators }
