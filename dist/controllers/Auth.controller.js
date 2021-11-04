"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordCtrl = exports.forgotPasswordCtrl = exports.singInCtrl = exports.verifyTokenCtrl = exports.accountActivationCtrl = exports.signUpRequestCtrl = void 0;
const Auth_service_1 = require("../services/Auth.service");
const User_service_1 = require("../services/User.service");
const User_model_1 = require("../models/User.model");
const signUpRequestCtrl = async (ctx) => {
    const { body } = ctx.request;
    const trx = await User_model_1.UsersModel.startTransaction();
    const user = await (0, User_service_1.createUser)(body, trx);
    await (0, Auth_service_1.signUp)(user.id, trx);
    trx.commit();
    ctx.ok();
};
exports.signUpRequestCtrl = signUpRequestCtrl;
const accountActivationCtrl = async (ctx) => {
    const { query: { token } } = ctx;
    const { body } = ctx.request;
    const userId = await (0, Auth_service_1.verifyToken)(token);
    const { first_name, last_name, id } = await (0, User_service_1.updateUserById)(Object.assign(Object.assign({}, body), { is_active: true }), userId);
    await (0, Auth_service_1.deactivateUserToken)(id);
    ctx.ok({ first_name, last_name });
};
exports.accountActivationCtrl = accountActivationCtrl;
const verifyTokenCtrl = async (ctx) => {
    const { query: { token } } = ctx;
    const result = await (0, Auth_service_1.verifyToken)(token);
    ctx.ok(result);
};
exports.verifyTokenCtrl = verifyTokenCtrl;
const singInCtrl = async (ctx) => {
    const { body } = ctx.request;
    const token = await (0, Auth_service_1.singIn)(body);
    ctx.ok(token);
};
exports.singInCtrl = singInCtrl;
const forgotPasswordCtrl = async (ctx) => {
    const { body: { email } } = ctx.request;
    const existUser = await (0, User_service_1.verifyUserEmail)(email);
    await (0, Auth_service_1.forgotPassword)(existUser.id);
    await (0, User_service_1.updateUserById)({ is_active: false }, existUser.id);
};
exports.forgotPasswordCtrl = forgotPasswordCtrl;
const resetPasswordCtrl = async (ctx) => {
    const { query: { token } } = ctx;
    const { body } = ctx.request;
    const userId = await (0, Auth_service_1.verifyToken)(token);
    const { id } = await (0, User_service_1.resetPassword)(body, userId);
    await (0, Auth_service_1.deactivateUserToken)(id);
    ctx.ok({ data: "ok" });
};
exports.resetPasswordCtrl = resetPasswordCtrl;
