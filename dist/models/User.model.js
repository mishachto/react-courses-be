"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.Users = void 0;
const objection_1 = require("objection");
const knex_1 = require("../knex");
class Users extends objection_1.Model {
    static get tableName() {
        return "users";
    }
}
exports.Users = Users;
Users.modifiers = {
    defaultSelects(builder) {
        builder.select("id", "email", "first_name", "last_name", "avatar", "password");
    },
};
exports.UsersModel = Users.bindKnex(knex_1.default);
