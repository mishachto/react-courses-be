import { TodosModel } from '../models/Todos.model';

export const fetchAllTodos = async () => {
    // row SELECT id, titile, completed FROM todos where is_active = true
    return TodosModel.query()
        .select(["id", "title", "completed"])
        .where({ is_active: true })
}

export const fetchTodoById = async (id: number) => {
    // row SELECT * FROM todos WHERE todos.id = 123
    return TodosModel.query().findById(id)
}

export const createTodo = async (todo: any) => {
    console.log('todo -> service', todo)
    // row INSERT todos SET title = Test todo 001, completed = false 
    return TodosModel.query().insertAndFetch({ ...todo, completed: false, is_active: true, created_by: "misha" })
}

export const updateTodoById = async (id: number, todo: any) => {
    // UPDATE todos SET title = Test todo 002 WHERE todos.id = 123
    console.log(id);

    return TodosModel.query().updateAndFetchById(id, todo)
}

export const removeTodoById = async (id: number) => {
    // soft delete
    return TodosModel.query().update({ is_active: false }).where({ id })
    // hard delete
    return TodosModel.query().deleteById(id)
}