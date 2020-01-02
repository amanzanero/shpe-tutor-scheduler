/**
 * Course controller
 */

const httpStatus = require('http-status');
const Course = require('../models/course.model');
const User = require('../models/user.model');

const responseObject = {
  success: 1,
  message: '',
  data: {},
};

exports.createCourse = async (req, res) => {
  try {
    // create a course
    const course = new Course(req.body);
    const savedCourse = await course.save();

    // build object to respond with
    const succRes = responseObject;
    succRes.message = 'Course created.';
    succRes.data = await savedCourse.transform();
    res.status(httpStatus.CREATED);
    return res.json(succRes);
  } catch (err) {
    const failRes = { ...responseObject };
    failRes.message = 'Failed to create.';
    failRes.success = 0;
    res.status(httpStatus.UNPROCESSABLE_ENTITY);
    return res.json(failRes);
  }
};

exports.getCurrentTermCourses = async (req, res) => {
  try {
    return await Course.find().exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          ...responseObject,
          message: 'Server error.',
        });
      }
      const courseData = doc.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.school]: prev[curr.school]
            ? [...prev[curr.school], curr]
            : [curr],
        }),
        {},
      );
      return res.status(200).json({
        ...responseObject,
        message: 'Success',
        data: {
          courses: courseData,
        },
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      ...responseObject,
      message: 'Server error.',
    });
  }
};

exports.addUserCurrentCourse = async (req, res) => {
  try {
    const { user, body } = req;
    await User.updateOne(
      { _id: user.id },
      { $push: { currentCourses: body.courseID } },
    );
    return res
      .status(httpStatus.OK)
      .json({ message: 'success', ...responseObject });
  } catch (err) {
    console.log(err.message);
    const failRes = { ...responseObject, success: 0, message: err.message };
    return res.status(httpStatus.NOT_MODIFIED).json(failRes);
  }
};

exports.addUserPreviousCourse = async (req, res) => {
  try {
    const { user, body } = req;
    await User.updateOne(
      { _id: user.id },
      { $push: { previousCourses: body.courseID } },
    );
    return res
      .status(httpStatus.OK)
      .json({ message: 'success', ...responseObject });
  } catch (err) {
    console.log(err.message);
    const failRes = { ...responseObject, success: 0, message: err.message };
    return res.status(httpStatus.NOT_MODIFIED).json(failRes);
  }
};

exports.deleteUserCurrentCourse = async (req, res) => {
  const { user, body } = req;
  await User.findByIdAndUpdate(
    { _id: user.id },
    { $pull: { currentCourses: body.courseID } },
  ).exec(err => {
    if (err) {
      console.log(err);
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ ...responseObject, success: 0, message: err });
    }
    return res
      .status(httpStatus.OK)
      .json({ message: 'Successfully deleted course.' });
  });
};

exports.deleteUserPreviousCourses = async (req, res) => {
  const { user, body } = req;
  await User.findByIdAndUpdate(
    { _id: user.id },
    { $pull: { previousCourses: body.courseID } },
  ).exec(err => {
    if (err) {
      console.log(err);
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ ...responseObject, success: 0, message: err });
    }
    return res
      .status(httpStatus.OK)
      .json({ message: 'Successfully deleted course.' });
  });
};

exports.toggleCourse = async (req, res) => {
  const { user, body } = req;
  await User.findById(user.id).exec(async (err, usr) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    try {
      if (usr.currentCourses.includes(body.courseID)) {
        usr.currentCourses = usr.currentCourses.filter(
          id => id !== body.courseID,
        );
        usr.previousCourses.push(body.courseID);
      } else {
        usr.previousCourses = usr.previousCourses.filter(
          id => id !== body.courseID,
        );
        usr.currentCourses.push(body.courseID);
      }
      return await usr.save(saveErr => {
        console.log(saveErr);
        return res
          .status(500)
          .json({ ...responseObject, succes: 0, message: 'Server error.' });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ...responseObject, succes: 0, message: 'Server error.' });
    }
  });
};
