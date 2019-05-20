/**
 * Authenticated/User routes
 */

const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const appointmentController = require('../../controllers/appointment.controller');
const { create } = require('../../validations/appointment.validation');
const auth = require('../../middlewares/authorization');

router.post(
  '/',
  auth(),
  validator(create),
  appointmentController.makeAppointment,
);

module.exports = router;
