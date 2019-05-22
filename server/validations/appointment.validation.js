/**
 * Validator for appointments
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  create: {
    body: {
      tutor: Joi.objectId().required(),
      student: Joi.objectId().required(),
      guests: Joi.string(),
      // courseId: Joi.object().required(),
      phone: Joi.string()
        .min(10)
        .max(15)
        .regex(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
        .required(),
    },
  },

  del: {
    body: {
      id: Joi.objectId().required(),
    },
  },
};
