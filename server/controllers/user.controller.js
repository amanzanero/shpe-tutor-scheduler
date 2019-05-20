/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const config = require('../config');

const responseObject = {
  success: 1,
  status: '',
  message: '',
  data: {},
};

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    return res.send(savedUser.transform());
  } catch (error) {
    return next(User.checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret);
    return res.json({ message: 'OK', token });
  } catch (error) {
    return next(error);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    return (
      User.findOne({ _id: req.user._id })
        .populate('apptsId')
        // eslint-disable-next-line prettier/prettier
      .then((user) => {
          // Do something with the user
          const successResponse = responseObject; // copy
          successResponse.success = 1;
          successResponse.message = 'User successfully found';
          successResponse.data = user.transform(); // schema to json
          successResponse.status = httpStatus.OK;
          return res.json(successResponse);
        })
    );
  } catch (err) {
    const failureResponse = responseObject;
    failureResponse.success = 0;
    failureResponse.message = 'Failed to fetch user.';
    failureResponse.status = httpStatus.INTERNAL_SERVER_ERROR;
    return res.json(failureResponse);
  }
};
