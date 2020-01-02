const express = require('express');

const router = express.Router();
const userRouter = require('./user.route');
const apptRouter = require('./appointment.route');
const authRouter = require('./example-auth.route');
const courseRouter = require('./course.route');

router.get('/status', (req, res) => {
  res.send({ status: 'OK' });
}); // api status

router.use('/user', userRouter); // mount user paths
router.use('/auth', authRouter);
router.use('/appointment', apptRouter);
router.use('/course', courseRouter);
module.exports = router;
