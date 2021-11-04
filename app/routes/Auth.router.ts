import * as Router from "koa-joi-router";
import { signUpResponse, signUpRequest, errorValidators } from '../shared/validators';
import { signUpRequestCtrl, accountActivationCtrl, verifyTokenCtrl, singInCtrl, forgotPasswordCtrl, resetPasswordCtrl } from '../controllers/Auth.controller'

const authRouter = Router();
authRouter.prefix("/auth");

authRouter.route({
    method: "post",
    path: "/",
    validate: {
        type: "json",
        body: signUpRequest,
        output: {
            200: {
              body: signUpResponse,
            },
            204: {
              body: signUpResponse,
            },
            500: {
              body: errorValidators,
            },
            400: {
              body: errorValidators,
            },
          },
    },
    handler: signUpRequestCtrl
})

authRouter.route({
  method: "post",
  path: "/account-activation",
  handler: accountActivationCtrl
})

authRouter.route({
  method: "get",
  path: "/verify-token",
  handler: verifyTokenCtrl
})

authRouter.route({
  method: "post",
  path: "/login",
  handler: singInCtrl
})

authRouter.route({
  method: "patch",
  path: "/forgot-password",
  handler: forgotPasswordCtrl
})

authRouter.route({
  method: "patch",
  path: "/reset-password",
  handler: resetPasswordCtrl
})

export default () => authRouter;