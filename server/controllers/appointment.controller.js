/**
 * Appointment controller
 */

const httpStatus = require('http-status');
const Appointment = require('../models/appointment.model');

const responseObject = {
  success: 1,
  message: '',
  data: {},
  status: '',
};

exports.makeAppointment = async (req, res, next) => {
  try {
    const popQuery = [
      { path: 'tutor', model: 'User', select: 'email name' },
      { path: 'students', model: 'User', select: 'email name' },
    ];

    // save appointment and find in database then populate
    const appt = new Appointment(req.body);
    const savedAppt = await appt.save();
    const responseAppt = await Appointment.findById(savedAppt.id).populate(
      popQuery,
    );

    // build object to respond with
    const succRes = responseObject;
    succRes.message = 'Appointment created.';
    succRes.status = httpStatus.CREATED;
    succRes.data = await responseAppt.transform();
    return res.json(succRes);
  } catch (err) {
    return next(err);
  }
};
