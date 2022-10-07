import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createToDo = async (request, reply) => {
  const { body } = request;
  const { title, description, isDone = false } = body;
  const db = await getDB();

  const id = v4();

  const todo = {
    title,
    description,
    isDone,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.todos[id] = todo;

  await saveDB(db);

  return {
    id,
    ...todo
  };
};
