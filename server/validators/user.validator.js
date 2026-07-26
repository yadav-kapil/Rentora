const Joi = require("joi");


const loginSchemaValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a Valid Email",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});

const signupSchemaValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "any.required": "Name is required",
    }),

  role: Joi.string()
    .valid("Host", "User")
    .default("User"),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9@#$%^&+=!]*$"))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 50 characters",
      "string.pattern.base": "Password contains invalid characters",
      "any.required": "Password is required",
    }),
});

module.exports = { loginSchemaValidation, signupSchemaValidation };