'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/).required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required()
    }
  }
}
