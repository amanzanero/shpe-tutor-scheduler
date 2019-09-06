const Joi = require('joi');

// User validation rules
module.exports = {
  create: {
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/)
      .required(),
    password: Joi.string()
      .min(6)
      .max(128)
      .required(),
    name: Joi.string()
      .max(128)
      .required(),
    major: Joi.string()
      .max(128)
      .required(),
    role: Joi.string()
      .max(128)
      .required(),
    year: Joi.string()
      .max(4)
      .required(),
  },

  login: {
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/)
      .required(),
    password: Joi.string()
      .min(6)
      .max(128)
      .required(),
  },
};
