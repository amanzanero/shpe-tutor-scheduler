/**
 * Appointment controller
 */

const httpStatus = require('http-status');
const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

const responseObject = {
  success: 1,
  message: '',
  data: {},
};

exports.makeAppointment = async (req, res, next) => {
  try {
    // check if users exist
    const { student, tutor } = req.body;
    const exists = await User.find({ _id: { $in: [student, tutor] } });
    if (exists.length < 2) {
      return res.status(httpStatus.FAILED_DEPENDENCY).json({
        ...responseObject,
        success: 0,
        message: 'One or both users do not exist.',
      });
    }

    // create appt
    const appt = new Appointment(req.body);
    const savedAppt = await appt.save();

    // add appointment id to users
    let studObj, tutObj;
    exists.forEach(usr => {
      const usrObj = { name: usr.name, email: usr.email };
      if (usr.id === student) {
        studObj = usrObj;
      } else {
        tutObj = usrObj;
      }
      usr.addAppointment(savedAppt.id);
    });

    // build object to respond with
    return res.status(httpStatus.CREATED).json({
      ...responseObject,
      message: 'Appointment created.',
      data: {
        ...savedAppt.toObject(),
        student: studObj,
        tutor: tutObj,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    return Appointment.findByIdAndDelete(req.body.id).then(() => {
      res.status(httpStatus.OK);
      const succRes = responseObject;
      succRes.message = 'Appointment successfully deleted.';
      return res.json(succRes);
    });
  } catch (err) {
    return next(err);
  }
};
