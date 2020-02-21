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
  const customers = await query.select('id', 'name', 'phone AS phoneNumber', 'cafe24_id AS cafe24Id').catch((err) => { next(err); });
  res.json(response(200, {
    customers,
    totalCustomerNum: totalCustomerNum[0]['count(*)'],
  }));
};
exports.postUser = async (req, res, next) => {
  const customerKey = ['name', 'phone', 'cafe24_id', 'birth_date'];
  const customerImageKey = ['files', 'customer_id', 'file_url', 'file_name'];
  const customerParam = {};
  const customerImageParams = [];
  customerKey.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) customerParam[key] = req.body[key];
  });
  customerImageKey.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(req.files, key)) {
      req.files.files.forEach((file) => {
        const customerImageParam = {};
        customerImageParam.file_url = file.path;
        customerImageParam.file_name = file.filename;
        customerImageParams.push(customerImageParam);
      });
    }
  });

  let customerId;
  return connection.transaction((t) => connection('customer')
    .transacting(t)
    .insert(customerParam)
    .then((customerRes) => {
      [customerId] = customerRes;
      connection('customer_image')
        .insert(
          customerImageParams.map((param) => ({
            customer_id: customerId,
            file_url: param.file_url,
            file_name: param.file_name,
          })),
        )
        .catch((err) => next(err));
    })
    .then(t.commit)
    .catch(t.rollback))
    .then(() => {
      res.json(response(200, {}, `customer Id: ${customerId}`));
    })
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
