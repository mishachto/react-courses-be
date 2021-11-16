import { UsersModel } from '../models/User.model';
import { Transaction } from 'objection';
import { UserTokens } from '../models/UserTokens.model';
import * as bcrypt from "bcryptjs";

export const getHashedPassword = (password: string) => {
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(password, salt);
};

export const createUser = (data: { email: string }, trx: Transaction) => {
    return UsersModel.query(trx).insert({ ...data, created_by: "auth" })
}

export const updateUserById = (data: { [key: string]: string | number | boolean }, id: number) => {
    if (data.password) {
        data.password = getHashedPassword(data.password as string)
    }
    delete data.confirmPassword
    return UsersModel.query().updateAndFetchById(id, data);
}

export const verifyUserEmail = async (email: string) => {
    const existUser = await UsersModel.query().where({ email }).first();

    if (existUser) {
        return existUser
    } else {
        throw { status: 403, message: "User with such email doesn't exist" };
    }
}

export const resetPassword = async ({ password }: { password: string }, user_id: number) => {
    return await UsersModel.query().updateAndFetchById(user_id, { is_active: true, password: getHashedPassword(password as string) })
}