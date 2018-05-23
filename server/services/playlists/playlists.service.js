// Initializes the `playlists` service on path `/playlists`
const createService = require('./playlists.class.js');
const hooks = require('./playlists.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/playlists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlists');

  service.hooks(hooks);
};
