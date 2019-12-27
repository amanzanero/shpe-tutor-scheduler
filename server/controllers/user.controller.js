/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const config = require('../config');

const responseObject = {
  success: 1,
  message: '',
  data: {},
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const succRes = responseObject;
    succRes.message = 'User created.';
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret);
    succRes.data = {
      ...savedUser.transform(),
      token,
    };
    res.status(httpStatus.CREATED);
    return res.json(succRes);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
    return res
      .status(400)
      .json({ ...responseObject, success: 0, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret);
    return res.status(httpStatus.OK).json({
      ...responseObject,
      message: 'User logged in.',
      data: {
        token,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error.message);
    return res
      .status(400)
      .json({ ...responseObject, success: 0, message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    return User.findOne({ _id: req.user._id })
      .populate('appointments')
      .populate('currentCourses')
      .populate('previousCourses')
      .exec((err, user) => {
        if (err) return console.log(err);
        const successResponse = responseObject; // copy
        successResponse.success = 1;
        successResponse.message = 'User successfully found';
        successResponse.data = user.transform(); // schema to json
        return res.status(httpStatus.OK).json(successResponse);
      });
  } catch (err) {
    const failureResponse = responseObject;
    failureResponse.success = 0;
    failureResponse.message = 'Failed to fetch user.';
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(failureResponse);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    return (
      User.findOneAndDelete({ _id: req.user._id })
        // eslint-disable-next-line prettier/prettier
        .then(() => {
          // Do something with the user
          const successResponse = responseObject; // copy
          successResponse.success = 1;
          successResponse.message = 'User successfully deleted';
          res.status(httpStatus.OK);
          return res.json(successResponse);
        })
    );
  } catch (err) {
    const failureResponse = responseObject;
    failureResponse.success = 0;
    failureResponse.message = 'Failed to delete user.';
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json(failureResponse);
  }
};
