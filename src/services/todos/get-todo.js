import { getDB } from '../../utils/db/index.js';

export const getToDo = async (request, reply) => {
  const { params } = request;
  const { todoID: id } = params;
  const db = await getDB();

  const { todos } = db;

  if (!todos[id]) {
    return reply.notFound();
  }

  return {
    id,
    ...todos[id]
  };
};
