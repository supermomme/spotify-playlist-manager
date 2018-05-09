// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
  
  
    spotifyId: { type: String, required: true },
    spotify: { type: Object }
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
