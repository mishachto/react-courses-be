"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyUserEmail = exports.updateUserById = exports.createUser = exports.getHashedPassword = void 0;
const User_model_1 = require("../models/User.model");
const bcrypt = require("bcryptjs");
const getHashedPassword = (password) => {
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(password, salt);
};
exports.getHashedPassword = getHashedPassword;
const createUser = (data, trx) => {
    return User_model_1.UsersModel.query(trx).insert(Object.assign(Object.assign({}, data), { created_by: "auth" }));
};
exports.createUser = createUser;
const updateUserById = (data, id) => {
    if (data.password) {
        data.password = (0, exports.getHashedPassword)(data.password);
    }
    return User_model_1.UsersModel.query().updateAndFetchById(id, data);
};
exports.updateUserById = updateUserById;
const verifyUserEmail = async (email) => {
    const existUser = await User_model_1.UsersModel.query().where({ email }).first();
    if (existUser) {
        return existUser;
    }
    else {
        throw { status: 403, message: "User with such email doesn't exist" };
    }
};
exports.verifyUserEmail = verifyUserEmail;
const resetPassword = async ({ password }, user_id) => {
    return await User_model_1.UsersModel.query().updateAndFetchById(user_id, { is_active: true, password: (0, exports.getHashedPassword)(password) });
};
exports.resetPassword = resetPassword;
