"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosResponse = exports.todoResponse = void 0;
const koa_joi_router_1 = require("koa-joi-router");
exports.todoResponse = koa_joi_router_1.Joi.object({
    id: koa_joi_router_1.Joi.number().required(),
    title: koa_joi_router_1.Joi.string().required(),
    completed: koa_joi_router_1.Joi.boolean().required(),
});
exports.todosResponse = koa_joi_router_1.Joi.array()
    .items(exports.todoResponse);
