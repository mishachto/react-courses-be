"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidators = void 0;
const koa_joi_router_1 = require("koa-joi-router");
exports.errorValidators = koa_joi_router_1.Joi.object({
    code: koa_joi_router_1.Joi.number().required(),
    message: koa_joi_router_1.Joi.string().required(),
});
