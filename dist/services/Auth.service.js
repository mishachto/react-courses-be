"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.singIn = exports.deactivateUserToken = exports.verifyToken = exports.signUp = void 0;
const jwt = require("jsonwebtoken");
const UserTokens_model_1 = require("../models/UserTokens.model");
const User_model_1 = require("../models/User.model");
const bcrypt = require("bcryptjs");
const config = require('../../config').default;
const signUp = (id, trx) => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const token = jwt.sign({
        exp: date.getTime(),
        data: id
    }, config.SECRET_KEY);
    return UserTokens_model_1.UserTokensModel.query(trx).insert({ user_id: id, token, is_active: true });
};
exports.signUp = signUp;
const verifyToken = async (token) => {
    const existToken = await UserTokens_model_1.UserTokensModel.query().select(["user_id", "token"]).where({ token }).first();
    const decoded = jwt.verify(existToken.token, config.SECRET_KEY);
    if (decoded && decoded.exp > new Date().getTime()) {
        const existUser = await User_model_1.UsersModel.query().where({ id: decoded.data, is_active: true }).first();
        if (existUser) {
            throw { status: 403, message: "User already activated" };
        }
        else {
            return decoded.data;
        }
    }
    else {
        throw { status: 403, message: "Token expired" };
    }
};
exports.verifyToken = verifyToken;
const deactivateUserToken = (user_id) => {
    return UserTokens_model_1.UserTokensModel.query().update({ is_active: false }).where({ user_id });
};
exports.deactivateUserToken = deactivateUserToken;
const singIn = async ({ email, password }) => {
    const existUser = await User_model_1.UsersModel.query().modify("defaultSelects").where({ email }).first();
    if (!existUser) {
        throw { status: 403, message: "User with such email doesn't exist" };
    }
    else {
        const result = bcrypt.compareSync(password, existUser.password);
        if (result) {
            let date = new Date();
            date.setDate(date.getDate() + 3);
            const { password } = existUser, data = __rest(existUser, ["password"]);
            const token = jwt.sign({
                exp: date.getTime(),
                data,
            }, config.AUTH_SECRET_KEY);
            return token;
        }
        else {
            throw { status: 403, message: "Forbidden" };
        }
    }
};
exports.singIn = singIn;
const forgotPassword = (user_id) => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const token = jwt.sign({
        exp: date.getTime(),
        data: user_id
    }, config.SECRET_KEY);
    return UserTokens_model_1.UserTokensModel.query().update({ token, is_active: true }).where({ user_id });
};
exports.forgotPassword = forgotPassword;
