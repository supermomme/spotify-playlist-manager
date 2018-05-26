// shared-playlists-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sharedPlaylists = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    playlistId: { type: String, required: true, unique: true },
    description: { type: String },
    external_url: { type: String },
    images: [{
      height: { type: Number },
      width: { type: Number },
      url: { type: String },
    }],
    name: { type: String },
    tracks: [{
      added_at: { type: Date },
      trackId: { type: String },
      name: { type: String },
      duration_ms: { type: Number },
      external_url: { type: String },
      album: {
        albumId: { type: String },
        name: { type: String },
        external_url: { type: String },
        images: [{
          height: { type: Number },
          width: { type: Number },
          url: { type: String },
        }]
      },
      artists: [{
        artistId: { type: String },
        name: { type: String },
        external_url: { type: String }
      }],
    }],
    totalTracks: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('sharedPlaylists', sharedPlaylists);
};
