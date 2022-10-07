import { getDB } from '../../utils/db/index.js';

export const getManyToDo = async (request, reply) => {
  const { query } = request;
  const { limit = 5 } = query;
  const db = await getDB();

  const list = [];

  const todos = Object.entries(db.todos).map(([id, todo]) => {
    return {
      id,
      ...todo
    };
  }).sort((todo1, todo2) => {
    return todo2.createDate - todo1.createDate;
  });

  for (const todo of todos) {
    list.push(todo);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};
