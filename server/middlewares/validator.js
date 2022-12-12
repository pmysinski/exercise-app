const createError = require('http-errors');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    next(createError(400, e.errors.join(', ')));
  }
};

module.exports = validate;