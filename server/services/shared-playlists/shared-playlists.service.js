// Initializes the `shared-playlists` service on path `/shared-playlists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/shared-playlists.model');
const hooks = require('./shared-playlists.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/shared-playlists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('shared-playlists');

  service.hooks(hooks);
};
