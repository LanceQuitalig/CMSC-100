import { general } from './general/index.js';
import { createToDo } from './todos/create-todo.js';
import { deleteToDo } from './todos/delete-todo.js';
import { getManyToDo } from './todos/get-many-todos.js';
import { getToDo } from './todos/get-todo.js';
import { updateToDo } from './todos/update-todo.js';

export class Service {
    constructor (app) {
        this.app = app;
    }

    general = general
    createToDo = createToDo
    deleteToDo = deleteToDo
    getManyToDo = getManyToDo
    getToDo = getToDo
    updateToDo = updateToDo
}
