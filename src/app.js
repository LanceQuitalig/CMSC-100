import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import { general } from './services/general/index.js';
import { createToDo } from './services/todos/create-todo.js';
import { getManyToDo } from './services/todos/get-many-todos.js';
import { getToDo } from './services/todos/get-todo.js';
import { updateToDo } from './services/todos/update-todo.js';
import { deleteToDo } from './services/todos/delete-todo.js';

const prefix = '/api';

export async function build () {
  // Initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  fastify.get(prefix, general);

  // Create ToDo
  fastify.post(`${prefix}/todo`, createToDo);

  // Get many ToDos
  fastify.get(`${prefix}/todo`, getManyToDo);

  // Get one ToDo
  fastify.get(`${prefix}/todo/:todoID`, getToDo);

  // Update one ToDo
  fastify.put(`${prefix}/todo/:todoID`, updateToDo);

  // Delete one ToDo
  fastify.delete(`${prefix}/todo/:todoID`, deleteToDo);

  return fastify;
}
