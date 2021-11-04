import { Model, QueryBuilderType } from 'objection';
import knex from "../knex";

export class Users extends Model {
    static get tableName() {
      return "users";
    }

    id!: number;

    first_name: string;
    last_name: string;

    email: string;
    password: string;

    avatar: string;

    is_active: boolean;

    created_at: Date;
    created_by: string;

    updated_at: Date;
    updated_by: string;

    static modifiers = {
      defaultSelects(builder: QueryBuilderType<any>) {
        builder.select("id", "email", "first_name", "last_name", "avatar", "password");
      },
    }
}

export const UsersModel = Users.bindKnex(knex);