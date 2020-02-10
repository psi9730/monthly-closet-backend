// export the schemas
const customer = require('./customerSchema');

module.exports = {
  '/customer': {
    post: customer.personDataSchema,
  },
};
