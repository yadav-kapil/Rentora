const Joi = require("joi");

const homeSchemaValidation = Joi.object({
  home: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().allow("", null),
    imageUrl: Joi.string().uri().allow("", null),
    price: Joi.number().min(0).required(),
    location: Joi.string().trim().required(),
    category: Joi.string().trim().allow("", null),
    bedrooms: Joi.number().min(0).allow("", null),
    guestNumbers: Joi.number().min(0).allow("", null),
    amenities: Joi.array().items(Joi.string().trim()).allow(null),
  }).required()
});

module.exports = homeSchemaValidation;