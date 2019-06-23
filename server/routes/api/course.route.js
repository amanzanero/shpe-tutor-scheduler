/**
 * Authenticated/User routes
 */

const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const courseController = require('../../controllers/course.controller');
const create = require('../../validations/course.validation');
const auth = require('../../middlewares/authorization');

router.post(
  '/add',
  auth(),
  validator(create),
  courseController.createCourse,
);


module.exports = router;
