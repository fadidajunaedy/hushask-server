const Joi = require("joi");

module.exports = {
  register: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),

  login: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),

  forgotPassword: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),

  resetPassword: Joi.object({
    body: Joi.object({
      newPassword: Joi.string().required(),
    }),
    params: Joi.object({
      resetPasswordToken: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),

  changePassword: Joi.object({
    body: Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),
};
