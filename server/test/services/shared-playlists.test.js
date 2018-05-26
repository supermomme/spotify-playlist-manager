const assert = require('assert');
const app = require('../../../server/app');

describe('\'shared-playlists\' service', () => {
  it('registered the service', () => {
    const service = app.service('shared-playlists');

    assert.ok(service, 'Registered the service');
  });
});
