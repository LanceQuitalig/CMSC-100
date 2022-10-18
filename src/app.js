import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

const prefix = '/api';

export async function build () {
  // Initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const openAPIGlueOptions = {
    prefix
  };

  const swaggerOptions = {
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  // fastify.get(prefix, general);

  // // Create ToDo
  // fastify.post(`${prefix}/todo`, createToDo);

  // // Get many ToDos
  // fastify.get(`${prefix}/todo`, getManyToDo);

  // // Get one ToDo
  // fastify.get(`${prefix}/todo/:todoID`, getToDo);

  // // Update one ToDo
  // fastify.put(`${prefix}/todo/:todoID`, updateToDo);

  // // Delete one ToDo
  // fastify.delete(`${prefix}/todo/:todoID`, deleteToDo);

  return fastify;
}
