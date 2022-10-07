import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object that was created with ID, isDone, and dates', async () => {
    const newToDo = {
      title: 'New Title',
      description: 'New Description',
      isDone: true
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.id.must.not.be.null();

    // Expecting that all of the values equal newToDo properties
    result.title.must.be.equal(newToDo.title);
    result.description.must.be.equal(newToDo.description);
    result.isDone.must.be.equal(newToDo.isDone);

    // Expecting dates to be initialized
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
