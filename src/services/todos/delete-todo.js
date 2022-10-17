import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteToDo = async (request, reply) => {
  const { params } = request;
  const { todoID: id } = params;
  const db = await getDB();

  delete db.todos[id];

  await saveDB(db);

  return {
    success: true
  };
};
