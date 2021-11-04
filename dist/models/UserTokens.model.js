"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokensModel = exports.UserTokens = void 0;
const objection_1 = require("objection");
const knex_1 = require("../knex");
const User_model_1 = require("./User.model");
class UserTokens extends objection_1.Model {
    static get tableName() {
        return "user_tokens";
    }
}
exports.UserTokens = UserTokens;
UserTokens.relationMappings = {
    user: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: User_model_1.Users,
        join: {
            from: "user_tokens.user_id",
            to: "users.id",
        },
    }
};
exports.UserTokensModel = UserTokens.bindKnex(knex_1.default);
