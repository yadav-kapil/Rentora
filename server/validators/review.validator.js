const Joi = require("joi");

const reviewSchemaValidation = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        description : Joi.string().required(),
    }).required()
})

module.exports = reviewSchemaValidation;