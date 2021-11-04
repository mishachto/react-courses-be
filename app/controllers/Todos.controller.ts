import { fetchAllTodos, fetchTodoById, createTodo, updateTodoById, removeTodoById } from '../services/Todos.service';
import { ParameterizedContext } from 'koa'

export const fetchAllTodosCtrl = async (ctx: ParameterizedContext) => {
    const todos = await fetchAllTodos();
    ctx.ok(todos);
}


export const fetchTodoByIdCtrl = async (ctx: ParameterizedContext) => {
    const { params: { id } } = ctx
    
    try {
        const todo = await fetchTodoById(id)
        ctx.ok(todo)
    } catch (err) {
        ctx.throw(err)
    }
}

export const createTodoCtrl = async (ctx: ParameterizedContext) => {
    const { body } = ctx.request
    const createdTodo = await createTodo(body)
    ctx.ok(createdTodo)
}

export const updateTodoByIdCtrl = async (ctx: ParameterizedContext) => {
    const { params: { id } } = ctx
    const { body } = ctx.request

    try {
        const updatedTodo = await updateTodoById(id, body)
        ctx.ok(updatedTodo)
    } catch (err) {
        ctx.throw(err)
    }
}

export const removeTodoByIdCtrl = async (ctx: ParameterizedContext) => {
    const { params: { id } } = ctx

    try {
        const removedTodo = await removeTodoById(id);
        ctx.ok(removedTodo)
    } catch (err) {
        ctx.throw(err)
    }
}