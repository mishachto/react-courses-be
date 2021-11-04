"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRequest = exports.signUpResponse = void 0;
const koa_joi_router_1 = require("koa-joi-router");
exports.signUpResponse = koa_joi_router_1.Joi.object({}).optional().allow(null);
exports.signUpRequest = koa_joi_router_1.Joi.object({
    email: koa_joi_router_1.Joi.string().email().required()
});
