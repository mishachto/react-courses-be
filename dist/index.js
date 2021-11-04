"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("./constants/global");
const Koa = require("koa");
require("./knex");
const Router = require("koa-router");
const Todos_router_1 = require("./routes/Todos.router");
const Auth_router_1 = require("./routes/Auth.router");
const middlewares_1 = require("./middlewares");
const app = new Koa();
const router = new Router({ prefix: "/api" });
app.use((0, middlewares_1.commonMiddlewares)());
router.use((0, Todos_router_1.default)().middleware());
router.use((0, Auth_router_1.default)().middleware());
app.use(router.routes());
app.listen(global_1.WEB_SERVER_SETTINGS.PORT, () => {
    console.log('Server is started!', `PORT: ${global_1.WEB_SERVER_SETTINGS.PORT}`);
});
