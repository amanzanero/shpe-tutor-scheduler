/**
 * User routes
 */
const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const userController = require('../../controllers/user.controller');
const { create } = require('../../validations/user.validation');
const auth = require('../../middlewares/authorization');

router.post('/register', validator(create), userController.register); // validate and register
router.post('/login', userController.login); // login
router.get('/profile', auth(), userController.getUserProfile);

module.exports = router;