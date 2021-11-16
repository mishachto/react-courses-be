import { Transaction } from 'objection';
import * as jwt from 'jsonwebtoken';
import { UserTokens, UserTokensModel } from '../models/UserTokens.model';
import { UsersModel } from '../models/User.model';
import * as bcrypt from "bcryptjs";

const config = require('../../config').default;
const mailgun = require("mailgun-js");
const DOMAIN = '';
const ApiKeyMg = ""
const mg = mailgun({ apiKey: ApiKeyMg, domain: DOMAIN });


// mg.messages().send(data, function (error: any, body: any) {
//     console.log("bodyMAILgun", body);
// });

export const signUp = (id: number, trx: Transaction, email: string) => {
  let date = new Date();

  date.setDate(date.getDate() + 1);

  const token = jwt.sign({
    exp: date.getTime(),
    data: id,
    email: email
  }, config.SECRET_KEY);

  const data = {
    from: 'Excited User <solonyna.misha2@gmail.com>',
    to: email,
    subject: 'Hello',
    text: `http://localhost:3000/activation/?token=${token}` 
  };
  
  mg.messages().send(data, function (error: any, body: any) {
    console.log("bodyMAILgun", body);
  });

  return UserTokensModel.query(trx).insert({ user_id: id, token, is_active: true })
}

export const verifyToken = async (token: string) => {
  const existToken = await UserTokensModel.query()
    .select(["user_id", "token"])
    .where({ token })
    .first();
  const decoded = jwt.verify(
    existToken.token,
    config.SECRET_KEY
  ) as jwt.JwtPayload;

  if (decoded && decoded.exp > new Date().getTime()) {
    const existUser = await UsersModel.query()
      .where({ id: decoded.data, is_active: true })
      .first();
    if (existUser) {
      throw { status: 403, message: "User already activated" };
    } else {
      return decoded.data;
    }
  } else {
    throw { status: 403, message: "Token expired" };
  }
};

export const deactivateUserToken = (user_id: number) => {
  return UserTokensModel.query().update({ is_active: false }).where({ user_id })
}

interface ISignIn { email: string, password: string }

export const singIn = async ({ email, password }: ISignIn) => {
  const existUser = await UsersModel.query().modify("defaultSelects").where({ email }).first();

  if (!existUser) {
    throw { status: 403, message: "User with such email doesn't exist" };
  } else {
    const result = bcrypt.compareSync(password, existUser.password);

    if (result) {
      let date = new Date();

      date.setDate(date.getDate() + 3);

      const { password, ...data } = existUser;

      const token = jwt.sign({
        exp: date.getTime(),
        data,
      }, config.SECRET_KEY);

      return { token };

    } else {
      throw { status: 403, message: "Forbidden" };
    }
  }
}

export const forgotPassword = (user_id: number) => {
  let date = new Date();

  date.setDate(date.getDate() + 1);

  const token = jwt.sign({
    exp: date.getTime(),
    data: user_id
  }, config.SECRET_KEY);

  return UserTokensModel.query().update({ token, is_active: true }).where({ user_id })
}