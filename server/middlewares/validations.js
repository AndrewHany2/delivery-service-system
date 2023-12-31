const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

const sendParcelSchema = Joi.object({
  pickupAddress: Joi.string().required(),
  dropoffAddress: Joi.string().required(),
});

const pickParcelSchema = Joi.object({
  _id: Joi.string().required(),
  pickupDateTime: Joi.string().required(),
  dropoffDateTime: Joi.string().required(),
});

module.exports = { loginSchema, sendParcelSchema, pickParcelSchema };
