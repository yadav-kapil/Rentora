const ExpressError = require("../utils/ExpressError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((err) => err.message).join(", ");
      throw new ExpressError(400, messages);
    }
    req.body = value;
    next();
  };
};

module.exports = validate;
