/**
 * Validator for courses
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  body: {
    name: Joi.string().required(),
    number: Joi.string()
      .max(3)
      .required(),
    school: Joi.string()
      .max(4)
      .required(),
  },
};
