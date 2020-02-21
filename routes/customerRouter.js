const express = require('express');
const multer = require('multer');

const router = express.Router();
const userController = require('../controllers/customerController');
const SchemaValidator = require('../utils/schemaValidator');

const validateRequest = SchemaValidator(true);
const upload = require('../utils/fileUpload');
const { MAX_FILE_NUM } = require('../config/constants');

router
  .route('/:id')
  .all(validateRequest)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/')
  .all(validateRequest)
  .get(userController.getAllUser)
  .post(upload.fields([{ name: 'files', maxCount: MAX_FILE_NUM }]), userController.postUser);

module.exports = router;
