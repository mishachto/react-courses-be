import { Model } from 'objection';
import knex from "../knex";

class Todos extends Model {
    static get tableName() {
      return "todos";
    }

    id!: number;

    title: string;
    completed: boolean;

    is_active: boolean;

    created_at: Date;
    created_by: string;

    updated_at: Date;
    updated_by: string;
}

export const TodosModel = Todos.bindKnex(knex);