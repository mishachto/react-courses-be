import { ParameterizedContext } from 'koa';
import { signUp, verifyToken, deactivateUserToken, singIn, forgotPassword } from '../services/Auth.service';
import { createUser, updateUserById, verifyUserEmail, resetPassword } from '../services/User.service';
import { UsersModel } from '../models/User.model';

export const signUpRequestCtrl = async (ctx: ParameterizedContext) => {
    const { body } = ctx.request;

    const trx = await UsersModel.startTransaction();

    const user = await createUser(body, trx)
    await signUp(user.id, trx);
    trx.commit();

    ctx.ok()
}

export const accountActivationCtrl = async (ctx: ParameterizedContext) => {
    const { query: { token } } = ctx;
    const { body } = ctx.request;

    const userId = await verifyToken(token as string);
    const { first_name, last_name, id } = await updateUserById({ ...body, is_active: true }, userId);
    await deactivateUserToken(id)

    ctx.ok({ first_name, last_name })
}

export const verifyTokenCtrl = async (ctx: ParameterizedContext) => {
    const { query: { token } } = ctx;

    const result = await verifyToken(token as string);

    ctx.ok(result);
}

export const singInCtrl = async (ctx: ParameterizedContext) => {
    const { body } = ctx.request;

    const token = await singIn(body);
    ctx.ok(token)
}

export const forgotPasswordCtrl = async (ctx: ParameterizedContext) => {
    const { body: { email } } = ctx.request;

    const existUser = await verifyUserEmail(email);
    await forgotPassword(existUser.id);
    await updateUserById({ is_active: false }, existUser.id)
}

export const resetPasswordCtrl = async (ctx: ParameterizedContext) => {
  const { query: { token } } = ctx;
  const { body } = ctx.request;

  const userId = await verifyToken(token as string);
  const { id } = await resetPassword(body, userId)
  await deactivateUserToken(id)
  ctx.ok({ data: "ok" })
}