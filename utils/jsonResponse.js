function getStandardResponse(status, data, message = '') {
  return {
    status,
    data,
    message,
  };
}
module.exports = getStandardResponse;
