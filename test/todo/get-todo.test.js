import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Getting a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return a todo given the ID', async () => {
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
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.id.must.be.equal(id);

    // Expecting that all of the values equal newToDo properties
    result.title.must.be.equal(newToDo.title);
    result.description.must.be.equal(newToDo.description);
    result.isDone.must.be.false();

    // Expecting dates to be initialized
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
