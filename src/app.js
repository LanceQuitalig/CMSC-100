import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createToDo } from './services/todos/create-todo.js';

const prefix = '/api';

export async function build () {
  // Initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, general);

  // Create ToDo
  fastify.post(`${prefix}/todo`, createToDo);

  return fastify;
}
