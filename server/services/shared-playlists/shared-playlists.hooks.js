const { authenticate } = require('@feathersjs/authentication').hooks;

const createPlaylist = require('../../hooks/create-playlist');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate('jwt'), createPlaylist() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
