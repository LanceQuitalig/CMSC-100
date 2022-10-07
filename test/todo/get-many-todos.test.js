import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Getting many todos should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return a list of objects with default limit', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo?limit=2`
    });

    // Checks if HTTP status code is 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // Expecting an id exists
    result.length.must.not.be.above(5);
  });
});
