"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        // console.log('---->', err)
        //   // ctx.body = {
        //   //   code: err.status,
        //   //   message: '1231231',
        //   // };
        //   ctx.throw( ctx.response.status,  ctx.response.message)
        ctx.app.emit("error", err, ctx);
    }
};
