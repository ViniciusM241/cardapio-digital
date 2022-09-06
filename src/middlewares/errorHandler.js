const Error = require('../bootstrap/Error');

function errorHandler(err, req, res, next) {
  let customError = err;

  if (!(err instanceof Error)) {
    console.error(err.message);

    customError = new Error(
      'Something went wrong',
      500,
    );
  }

  res.status(customError.status);

  return res.json(customError);
}

module.exports = errorHandler;
