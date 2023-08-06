const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.number().required(),
  phone: Joi.string().required(),
});

module.exports = contactSchema;
