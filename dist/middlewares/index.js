"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddlewares = void 0;
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const cors_options_1 = require("./cors.options");
const bodyparser_options_1 = require("./bodyparser.options");
const respond_options_1 = require("./respond.options");
// @ts-ignore
const respond = require("koa-respond");
// @ts-ignore
const koa_convert_1 = require("koa-convert");
// @ts-ignore
const responseTime = require("koa-response-time");
const errorHandler_1 = require("./errorHandler");
const commonMiddlewares = () => (0, koa_convert_1.compose)([
    cors(cors_options_1.default),
    responseTime(),
    bodyParser(bodyparser_options_1.default),
    respond(respond_options_1.default),
    errorHandler_1.default
]);
exports.commonMiddlewares = commonMiddlewares;
