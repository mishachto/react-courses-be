import { Joi } from "koa-joi-router";

export const todoResponse = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    completed: Joi.boolean().required(),
});

export const todosResponse = Joi.array()
    .items(todoResponse)