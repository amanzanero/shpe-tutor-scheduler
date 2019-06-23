/**
 * Course controller
 */

const httpStatus = require('http-status');
const Course = require('../models/course.model');

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
