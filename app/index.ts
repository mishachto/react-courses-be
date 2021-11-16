import { WEB_SERVER_SETTINGS } from './constants/global'
import * as Koa from 'koa';
import './knex';
import * as Router from "koa-router";
import todosRouter from './routes/Todos.router'
import authRouter from './routes/Auth.router'
import { commonMiddlewares } from "./middlewares";
import * as http from "http";





const app = new Koa();
const server = http.createServer(app.callback())
const router = new Router({ prefix: "/api" });

app.use(commonMiddlewares());

router.use(todosRouter().middleware());
router.use(authRouter().middleware());

app.use(router.routes())

// const io = require("socket.io")(server)

// io.on("connection", (socket) => {
//     socket.on("disconnect")
// })


server.listen(WEB_SERVER_SETTINGS.PORT, () => {
    console.log('Server is started!', `PORT: ${WEB_SERVER_SETTINGS.PORT}`)
});