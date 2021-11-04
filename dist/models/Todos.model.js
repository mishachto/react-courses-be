"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosModel = void 0;
const objection_1 = require("objection");
const knex_1 = require("../knex");
class Todos extends objection_1.Model {
    static get tableName() {
        return "todos";
    }
}
exports.TodosModel = Todos.bindKnex(knex_1.default);
