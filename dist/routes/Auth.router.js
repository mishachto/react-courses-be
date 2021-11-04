"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-joi-router");
const validators_1 = require("../shared/validators");
const Auth_controller_1 = require("../controllers/Auth.controller");
const authRouter = Router();
authRouter.prefix("/auth");
authRouter.route({
    method: "post",
    path: "/",
    validate: {
        type: "json",
        body: validators_1.signUpRequest,
        output: {
            200: {
                body: validators_1.signUpResponse,
            },
            204: {
                body: validators_1.signUpResponse,
            },
            500: {
                body: validators_1.errorValidators,
            },
            400: {
                body: validators_1.errorValidators,
            },
        },
    },
    handler: Auth_controller_1.signUpRequestCtrl
});
authRouter.route({
    method: "post",
    path: "/account-activation",
    handler: Auth_controller_1.accountActivationCtrl
});
authRouter.route({
    method: "get",
    path: "/verify-token",
    handler: Auth_controller_1.verifyTokenCtrl
});
authRouter.route({
    method: "post",
    path: "/login",
    handler: Auth_controller_1.singInCtrl
});
authRouter.route({
    method: "patch",
    path: "/forgot-password",
    handler: Auth_controller_1.forgotPasswordCtrl
});
authRouter.route({
    method: "patch",
    path: "/reset-password",
    handler: Auth_controller_1.resetPasswordCtrl
});
exports.default = () => authRouter;
