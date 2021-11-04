import { Joi } from "koa-joi-router";

export const signUpResponse = Joi.object({}).optional().allow(null);

export const signUpRequest = Joi.object({
    email: Joi.string().email().required()
})