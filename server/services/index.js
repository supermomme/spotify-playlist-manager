const users = require('./users/users.service.js');
const playlists = require('./playlists/playlists.service.js');
const sharedPlaylists = require('./shared-playlists/shared-playlists.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(playlists);
  app.configure(sharedPlaylists);
};
