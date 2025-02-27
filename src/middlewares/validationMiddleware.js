const ResponseError = require("../utils/responseError.js");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ResponseError(401, "Bad Request"));
    }

    next();
  };
};
