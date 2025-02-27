const Joi = require("joi");

module.exports = {
  getQuestion: Joi.object({
    body: Joi.object({}),
    params: Joi.object({
      questionId: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),
  createQuestion: Joi.object({
    body: Joi.object({
      roomId: Joi.string().required(),
      content: Joi.string().required().min(1).max(1000),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  }),
  deleteQuestion: Joi.object({
    body: Joi.object({}),
    params: Joi.object({
      questionId: Joi.string().required(),
    }),
    query: Joi.object({}),
  }),
};
