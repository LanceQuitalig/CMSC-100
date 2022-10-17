import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Updating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should update a todo given the ID', async () => {
    const newToDo = {
      title: 'Test Title',
      description: 'Test Description'
    };

    const newerToDo = {
      title: 'Updated title',
      description: 'Updated Description',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerToDo)
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.id.must.be.equal(id);

    // Expecting that all of the values equal newToDo properties
    result.title.must.be.equal(newerToDo.title);
    result.description.must.be.equal(newerToDo.description);
    result.isDone.must.be.equal(newerToDo.isDone);

    // Expecting dates to be initialized
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('Should update only the isDone of the todo given the ID', async () => {
    const newToDo = {
      title: 'Test Title',
      description: 'Test Description'
    };

    const newerToDo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerToDo)
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.id.must.be.equal(id);

    // Expecting that all of the values equal newToDo properties
    result.title.must.be.equal(newToDo.title);
    result.description.must.be.equal(newToDo.description);
    result.isDone.must.be.equal(newerToDo.isDone);

    // Expecting dates to be initialized
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('Should update only the title of the todo given the ID', async () => {
    const newToDo = {
      title: 'Test Title',
      description: 'Test Description'
    };

    const newerToDo = {
      title: 'updated Title'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerToDo)
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.id.must.be.equal(id);

    // Expecting that all of the values equal newToDo properties
    result.title.must.be.equal(newerToDo.title);
    result.description.must.be.equal(newToDo.description);
    result.isDone.must.be.false();

    // Expecting dates to be initialized
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });
});
