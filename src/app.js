import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createToDo } from './services/todos/create-todo.js';
import { getManyToDo } from './services/todos/get-many-todos.js';

const prefix = '/api';

export async function build () {
  // Initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, general);

  // Create ToDo
  fastify.post(`${prefix}/todo`, createToDo);

  // Get many ToDos
  fastify.get(`${prefix}/todo`, getManyToDo);

  return fastify;
}
