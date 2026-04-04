const ExpressError = require("../utils/ExpressError");
const homeSchemaValidation = require("../validators/home.validator");

const homeValidation = (req, res, next) => {
  const { error, value } = homeSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map(err => err.message).join(", ");
    throw new ExpressError(400, messages);
  }

  req.body = value;
  next();
};

module.exports = homeValidation;
