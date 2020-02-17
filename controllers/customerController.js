const connection = require('../utils/db');
const response = require('../utils/jsonResponse');

exports.getAllUser = async (req, res, next) => {
  let query = connection('customer');
  if (Object.keys(req.query).length > 0) {
    Object.keys(req.query).forEach((property) => {
      if (req.query[property] && property !== 'limit' && property !== 'offset') query = query.where(property, 'like', `%${req.query[property]}%`);
    });
  }
  const totalCustomerNum = await query.clone().count().catch((err) => { next(err); });

  if (Object.prototype.hasOwnProperty.call(req.query, 'limit')) {
    query = query.limit(req.query.limit);
    delete req.query.limit;
  }
  if (Object.prototype.hasOwnProperty.call(req.query, 'offset')) {
    query = query.offset(req.query.offset);
    delete req.query.offset;
  }
  const customers = await query.select('id', 'name', 'phone AS phoneNumber').catch((err) => { next(err); });
  res.json(response(200, {
    customers,
    totalCustomerNum: totalCustomerNum[0]['count(*)'],
  }));
};
exports.postUser = async (req, res, next) => {
  connection('customer')
    .insert(req.body)
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
