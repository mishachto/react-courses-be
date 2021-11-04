import * as Koa from "koa";

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    // console.log('---->', err)
    //   // ctx.body = {
    //   //   code: err.status,
    //   //   message: '1231231',
    //   // };

    //   ctx.throw( ctx.response.status,  ctx.response.message)
      ctx.app.emit("error", err, ctx);
  }
};
