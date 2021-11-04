import { Joi } from "koa-joi-router";

export const errorValidators = Joi.object({
  code: Joi.number().required(),
  message: Joi.string().required(),
});