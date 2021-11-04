import { Model } from 'objection';
import knex from "../knex";
import { Users } from './User.model';

export class UserTokens extends Model {
    static get tableName() {
      return "user_tokens";
    }

    id!: number;

    user_id: number;
    user?: Users;

    token: string;

    is_active: boolean;

    static relationMappings = {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: "user_tokens.user_id",
          to: "users.id",
        },
      }
    }

}

export const UserTokensModel = UserTokens.bindKnex(knex);