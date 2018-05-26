// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const axios = require('axios')

function getAllPlaylistTracks(page, accessToken) {
  if (page.next === null) {
    return Promise.resolve(page)
  }
  //return axios.get(page.next, { headers: { Authorization: `Bearer ${accessToken}` }})
  //.then(res => getAllPlaylistTracks(res, accessToken))
  //.then(res => page.items.push(res))
  // .then(res => {
  //   page.items.push(getAllPlaylistTracks(res, accessToken))
  // })
  return Promise.reject(errors.GeneralError(new Error('I exist')))
}

function playlistParser(curPlaylist, spotifyPlaylist, owner) {
  let result = Object.assign({}, curPlaylist, {
    owner: owner.id,
    name: spotifyPlaylist.name,
    description: spotifyPlaylist.description,
    external_url: spotifyPlaylist.external_urls.spotify,
    images: spotifyPlaylist.images,
    tracks: []
  })
  return getAllPlaylistTracks(spotifyPlaylist.tracks, owner.spotify.accessToken)
  .then(res => {
    res.items.forEach(track => {
      if (!track.is_local) {
        result.tracks.push({
          added_at: track.added_at,
          trackId: track.track.id,
          name: track.name,
          duration_ms: track.duration_ms,
          external_url: track.external_urls.spotify,
          album: {
            albumId: track.album.id,
            name: track.album.name,
            external_url: track.album.external_urls.spotify,
            images: track.album.images
          },
          artist: {
            artistId: track.artist.id,
            name: track.artist.name,
            external_url: track.artist.external_urls.spotify
          }
        })
      }
    });
    return result;
  })
  // await getAllPlaylistTracks(spotifyPlaylist.tracks, owner.spotify.accessToken).items.forEach(track => {
  //   if (!track.is_local) {
  //     result.tracks.push({
  //       added_at: track.added_at,
  //       trackId: track.track.id,
  //       name: track.name,
  //       duration_ms: track.duration_ms,
  //       external_url: track.external_urls.spotify,
  //       album: {
  //         albumId: track.album.id,
  //         name: track.album.name,
  //         external_url: track.album.external_urls.spotify,
  //         images: track.album.images
  //       },
  //       artist: {
  //         artistId: track.artist.id,
  //         name: track.artist.name,
  //         external_url: track.artist.external_urls.spotify
  //       }
  //     })
  //   }
  // });
  return result
}


function getAllPages(pages, accessToken) {
  if(pages[pages.length-1].next === null) return Promise.resolve(pages)
  return axios.get(pages[pages.length-1].next, { headers: { Authorization: `Bearer ${accessToken}` }})
  .then(res => {
    pages.push(res.data)
    return pages
  })
  .then(res => getAllPages(res, accessToken))
}

function getAllTracks(firstPage, accessToken) {
  return getAllPages([firstPage], accessToken)
  .then(pages => {
    let tracks = []
    pages.forEach(page => {
      page.items.forEach(track => {
        if (!track.is_local) {
          let artists = []
          track.track.artists.forEach(artist => {
            artists.push({
              artistId: artist.id,
              name: artist.name,
              external_url: artist.external_urls.spotify
            })
          })
          tracks.push({
            added_at: track.added_at,
            trackId: track.track.id,
            name: track.track.name,
            duration_ms: track.track.duration_ms,
            external_url: track.track.external_urls.spotify,
            album: {
              albumId: track.track.album.id,
              name: track.track.album.name,
              external_url: track.track.album.external_urls.spotify,
              images: track.track.album.images
            },
            artists
          })
        }

      })
    })
    return tracks
  })
}

async function getParsedPlaylists(firstPage, owner) {
  return getAllTracks(firstPage.tracks, owner.spotify.accessToken)
    .then(tracks => ({
      owner: owner._id,
      name: firstPage.name,
      description: firstPage.description,
      external_url: firstPage.external_urls.spotify,
      images: firstPage.images,
      tracks,
      totalTracks: tracks.length
    }))
  
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return context => {
    if(!context.data.playlistId) return errors.BadRequest('Path `playlistId` is required')
    return context.app.service('playlists').get(context.data.playlistId, {
      user: context.params.user
    })
    .then(res => getParsedPlaylists(res, context.params.user))
    .then(parsedPlaylist => Object.assign({}, context.data, parsedPlaylist))
    // .then(res => Object.assign({}, context.data, {
    //   owner: context.params.user.id,
    //   name: res.name,
    //   description: res.description,
    //   external_url: res.external_urls.spotify,
    //   images: res.images,
    //   tracks: []
    // }))
    .then(res => {
      context.data = res

      //context.data = playlistParser(context.data, res, context.params.user)
      return context
    })
  };
};
