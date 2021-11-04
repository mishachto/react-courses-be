"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodoByIdCtrl = exports.updateTodoByIdCtrl = exports.createTodoCtrl = exports.fetchTodoByIdCtrl = exports.fetchAllTodosCtrl = void 0;
const Todos_service_1 = require("../services/Todos.service");
const fetchAllTodosCtrl = async (ctx) => {
    const todos = await (0, Todos_service_1.fetchAllTodos)();
    ctx.ok(todos);
};
exports.fetchAllTodosCtrl = fetchAllTodosCtrl;
const fetchTodoByIdCtrl = async (ctx) => {
    const { params: { id } } = ctx;
    try {
        const todo = await (0, Todos_service_1.fetchTodoById)(id);
        ctx.ok(todo);
    }
    catch (err) {
        ctx.throw(err);
    }
};
exports.fetchTodoByIdCtrl = fetchTodoByIdCtrl;
const createTodoCtrl = async (ctx) => {
    const { body } = ctx.request;
    const createdTodo = await (0, Todos_service_1.createTodo)(body);
    ctx.ok(createdTodo);
};
exports.createTodoCtrl = createTodoCtrl;
const updateTodoByIdCtrl = async (ctx) => {
    const { params: { id } } = ctx;
    const { body } = ctx.request;
    try {
        const updatedTodo = await (0, Todos_service_1.updateTodoById)(id, body);
        ctx.ok(updatedTodo);
    }
    catch (err) {
        ctx.throw(err);
    }
};
exports.updateTodoByIdCtrl = updateTodoByIdCtrl;
const removeTodoByIdCtrl = async (ctx) => {
    const { params: { id } } = ctx;
    try {
        const removedTodo = await (0, Todos_service_1.removeTodoById)(id);
        ctx.ok(removedTodo);
    }
    catch (err) {
        ctx.throw(err);
    }
};
exports.removeTodoByIdCtrl = removeTodoByIdCtrl;
