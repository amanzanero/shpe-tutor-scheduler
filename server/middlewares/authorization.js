const passport = require('passport');
const httpStatus = require('http-status');
const bluebird = require('bluebird');

const User = require('../models/user.model');

// handleJWT with roles
const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = bluebird.promisify(req.logIn);
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return res.json({
      message: error ? error.message : 'Unauthorized',
      status: httpStatus.UNAUTHORIZED,
    });
  }

  // see if user is authorized to do the action
  if (!roles.includes(user.role)) {
    return res.json({
      message: 'Forbidden',
      status: httpStatus.FORBIDDEN,
    });
  }

  req.user = user;

  return next();
};

// exports the middleware
const authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate(
    'jwt',
    { session: false },
    handleJWT(req, res, next, roles),
  )(req, res, next);

module.exports = authorize;
