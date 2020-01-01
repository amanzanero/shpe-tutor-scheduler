/**
 * Authenticated/User routes
 */

const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const courseController = require('../../controllers/course.controller');
const { create, addCourse } = require('../../validations/course.validation');
const auth = require('../../middlewares/authorization');

router.post(
  '/',
  auth('admin'),
  validator(create),
  courseController.createCourse,
);
router.get('/current', auth(), courseController.getCurrentTermCourses);
router.put(
  '/userCurrent',
  auth(),
  validator(addCourse),
  courseController.addUserCurrentCourse,
);
router.put(
  '/userPrevious',
  auth(),
  validator(addCourse),
  courseController.addUserPreviousCourse,
);
router.delete('/userCurrent', auth(), courseController.deleteUserCurrentCourse);
router.delete(
  '/userPrevious',
  auth(),
  courseController.deleteUserCurrentCourse,
);

module.exports = router;
