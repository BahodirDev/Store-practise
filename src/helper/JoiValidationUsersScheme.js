const Joi = require('joi');


const userSchema = Joi.object({
    user_name: Joi.string().trim().required().max(24),
    user_nomer: Joi.number().required().max(99999999999999999999),
    user_role: Joi.number().integer().min(0).max(9).required(),
    user_login: Joi.string().trim().required().max(19),
    user_password: Joi.string().trim().required().max(19),
  });


const userSchemaUpdate = Joi.object({
    user_name: Joi.string().trim().required().max(24),
    user_nomer: Joi.number().required().max(99999999999999999999),
    user_role: Joi.number().integer().min(0).max(9).required(),
    user_login: Joi.string().trim().required().max(19),
    user_password: Joi.string().trim().required().max(19),
  });
  

  module.exports = {userSchema, userSchemaUpdate};