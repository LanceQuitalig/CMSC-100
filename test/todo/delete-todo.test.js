import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Deleting a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return success = true if ID is deleted', async () => {
    const newToDo = {
      title: 'Test Title',
      description: 'Test Description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'DELETE',
      url: `${prefix}/todo/${id}`
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting the object to be deleted
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    // Checks if HTTP status code is 404
    getResponse.statusCode.must.be.equal(404);
  });
});
