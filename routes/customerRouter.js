const express = require('express');

const router = express.Router();
const userController = require('../controllers/customerController');
const SchemaValidator = require('../utils/schemaValidator');

const validateRequest = SchemaValidator(true);

router
  .route('/')
  .all(validateRequest)
  .get(userController.getAllUser)
  .post(userController.postUser);

router
  .route('/:id')
  .all(validateRequest)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
