/**
 * Validator for appointments
 */
const Joi = require('joi');

// User validation rules
module.exports = {
  create: {
    body: {
      tutor: Joi.string().required(),
      student: Joi.string().required(),
      guests: Joi.string(),
      // courseId: Joi.object().required(),
      phone: Joi.string()
        .min(10)
        .max(15)
        .regex(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
        .required(),
    },
  },
};
