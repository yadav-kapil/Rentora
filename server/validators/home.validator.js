const Joi = require("joi");

const homeSchemaValidation = Joi.object({
  home: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    imageUrl: Joi.string().uri().allow("", null),
    price: Joi.number().min(0).required(),
    location: Joi.string().trim().required()
  }).required()
});

module.exports = homeSchemaValidation;