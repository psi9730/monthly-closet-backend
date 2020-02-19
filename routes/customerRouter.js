const express = require('express');

const router = express.Router();
const userController = require('../controllers/customerController');
const SchemaValidator = require('../utils/schemaValidator');

const validateRequest = SchemaValidator(true);
const loader = require('../utils/fileUpload');
const { MAX_FILE_NUM } = require('../config/constants');

router.post('/', loader.array('files', MAX_FILE_NUM), userController.postUser);
router
  .route('/')
  .all(validateRequest)
  .get(userController.getAllUser)
  // .post(loader.array('files', MAX_FILE_NUM), userController.postUser);

router
  .route('/:id')
  .all(validateRequest)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
