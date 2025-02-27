const Joi = require("joi");

module.exports = {
  getRoom: Joi.object({
    body: Joi.object({}),
    params: Joi.object({
      roomId: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),
  getRoomByAccessCode: Joi.object({
    body: Joi.object({}),
    params: Joi.object({
      accessCode: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),
  createRoom: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(""),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),
  updateRoom: Joi.object({
    body: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().allow("").optional(),
      isActive: Joi.boolean().optional(),
    }),
    params: Joi.object({
      roomId: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),
};
