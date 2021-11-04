"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-joi-router");
const validators_1 = require("../shared/validators");
const Todos_controller_1 = require("../controllers/Todos.controller");
const todosRouter = Router();
todosRouter.prefix("/todos");
todosRouter.route({
    method: "get",
    path: "/",
    validate: {
        output: {
            200: {
                body: validators_1.todosResponse,
            },
            500: {
                body: validators_1.errorValidators,
            },
            400: {
                body: validators_1.errorValidators,
            },
        },
    },
    handler: Todos_controller_1.fetchAllTodosCtrl
});
todosRouter.route({
    method: "get",
    path: "/:id",
    handler: Todos_controller_1.fetchTodoByIdCtrl
});
todosRouter.route({
    method: "post",
    path: "/",
    handler: Todos_controller_1.createTodoCtrl
});
todosRouter.route({
    method: "put",
    path: "/:id",
    handler: Todos_controller_1.updateTodoByIdCtrl
});
todosRouter.route({
    method: "delete",
    path: "/:id",
    handler: Todos_controller_1.removeTodoByIdCtrl
});
exports.default = () => todosRouter;
