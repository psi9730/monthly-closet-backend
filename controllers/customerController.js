const connection = require('../utils/db');
const response = require('../utils/jsonResponse');

exports.getAllUser = async (req, res, next) => {
  connection('customer')
    .where(req.query)
    .then(
      (rows) => res.json(response(200, rows)),
    )
    .catch((err) => { next(err); });
};
exports.postUser = async (req, res, next) => {
  connection('customer')
    .where(req.query)
    .then(
      (rows) => res.json(response(200, rows)),
    )
    .catch((err) => { next(err); });
};
exports.getUser = async (req, res, next) => {
  connection('customer')
    .where(req.query)
    .then(
      (rows) => res.json(response(200, rows)),
    )
    .catch((err) => { next(err); });
};

// Don't update password on this
exports.updateUser = async (req, res, next) => {
  connection('customer')
    .where(req.query)
    .then(
      (rows) => res.json(response(200, rows)),
    )
    .catch((err) => { next(err); });
};
exports.deleteUser = async (req, res, next) => {
  connection('customer')
    .where(req.query)
    .then(
      (rows) => res.json(response(200, rows)),
    )
    .catch((err) => { next(err); });
};
