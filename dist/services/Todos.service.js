"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodoById = exports.updateTodoById = exports.createTodo = exports.fetchTodoById = exports.fetchAllTodos = void 0;
const Todos_model_1 = require("../models/Todos.model");
const fetchAllTodos = async () => {
    // row SELECT id, titile, completed FROM todos where is_active = true
    return Todos_model_1.TodosModel.query()
        .select(["id", "title", "completed"])
        .where({ is_active: true });
};
exports.fetchAllTodos = fetchAllTodos;
const fetchTodoById = async (id) => {
    // row SELECT * FROM todos WHERE todos.id = 123
    return Todos_model_1.TodosModel.query().findById(id);
};
exports.fetchTodoById = fetchTodoById;
const createTodo = async (todo) => {
    console.log('todo -> service', todo);
    // row INSERT todos SET title = Test todo 001, completed = false 
    return Todos_model_1.TodosModel.query().insertAndFetch(Object.assign(Object.assign({}, todo), { completed: false, is_active: true, created_by: "misha" }));
};
exports.createTodo = createTodo;
const updateTodoById = async (id, todo) => {
    // UPDATE todos SET title = Test todo 002 WHERE todos.id = 123
    console.log(id);
    return Todos_model_1.TodosModel.query().updateAndFetchById(id, todo);
};
exports.updateTodoById = updateTodoById;
const removeTodoById = async (id) => {
    // soft delete
    return Todos_model_1.TodosModel.query().update({ is_active: false }).where({ id });
    // hard delete
    return Todos_model_1.TodosModel.query().deleteById(id);
};
exports.removeTodoById = removeTodoById;
