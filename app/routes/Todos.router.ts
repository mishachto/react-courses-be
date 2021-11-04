import * as Router from "koa-joi-router";
import { todosResponse, errorValidators } from '../shared/validators';
import { fetchAllTodosCtrl, fetchTodoByIdCtrl, createTodoCtrl, updateTodoByIdCtrl, removeTodoByIdCtrl } from "../controllers/Todos.controller";

const todosRouter = Router();
todosRouter.prefix("/todos");

todosRouter.route({
    method: "get",
    path: "/",
    validate: {
        output: {
            200: {
              body: todosResponse,
            },
            500: {
              body: errorValidators,
            },
            400: {
              body: errorValidators,
            },
          },
    },
    handler: fetchAllTodosCtrl
})

todosRouter.route({
    method: "get",
    path: "/:id",
    handler: fetchTodoByIdCtrl
})

todosRouter.route({
    method: "post",
    path: "/",
    handler: createTodoCtrl
})

todosRouter.route({
    method: "put",
    path: "/:id",
    handler: updateTodoByIdCtrl
})

todosRouter.route({
    method: "delete",
    path: "/:id",
    handler: removeTodoByIdCtrl
})

export default () => todosRouter;