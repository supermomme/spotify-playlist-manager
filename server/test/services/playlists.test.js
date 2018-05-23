const assert = require('assert');
const app = require('../../../server/app');

describe('\'playlists\' service', () => {
  it('registered the service', () => {
    const service = app.service('playlists');

    assert.ok(service, 'Registered the service');
  });
});
