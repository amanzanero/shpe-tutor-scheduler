/**
 * Validator for courses
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      number: Joi.string()
        .min(3)
        .max(5)
        .required(),
      school: Joi.string()
        .max(4)
        .required(),
    },
  },
  addCourse: {
    body: {
      courseIDs: Joi.array().items(Joi.objectId()),
    },
  },
};
