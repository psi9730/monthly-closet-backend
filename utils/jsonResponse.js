function getStandardResponse(status, data, message = '') {
  if (data) {
    return {
      status,
      data,
      message,
    };
  }
  return {
    status,
    message,
  };
}
module.exports = getStandardResponse;
