/* eslint-disable no-unused-vars */
const axios = require('axios')

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup (app) {
    this.app = app
  }

  async get (id, params) {
    let Authorization = `Bearer ${params.user.spotify.accessToken}`
    return axios.get(`https://api.spotify.com/v1/users/${params.user.spotify.profile.id}/playlists/${id}`, { headers: { Authorization }})
      .then(res => res.data)
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
