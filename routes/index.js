const express = require('express');
const customer = require('./customerRouter');

const router = express.Router();
// const authController = require('./../controllers/authController');


// router.post('/login', authController.login);
// router.post('/signup', authController.signup);

// Protect all routes after this middleware
// router.use(authController.protect);

// router.delete('/deleteMe', userController.deleteMe);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo('admin'));
router.use('/customer', customer);

module.exports = router;
