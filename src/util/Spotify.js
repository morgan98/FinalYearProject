import SpotifyWebApi from 'spotify-web-api-js';

export const SpotApi = new SpotifyWebApi();


// Pass in Spotify API AuthToken
export function passAuthToken(authToken) {
  SpotApi.setAccessToken(authToken);
}

/* User Information Functions */ 

// Get the users account infromation
export async function UserDetails(authToken) {
  passAuthToken(authToken);

  // Store user information from Spotify Api 'getMe' function
  const usersSpotifyInfo = await SpotApi.getMe()
  return usersSpotifyInfo;
}

// Get the User's Top Tracks based on short term history in the spotify API
export async function usersTopTracks(authToken) {
  passAuthToken(authToken);

  const usersSongs = await SpotApi.getMyTopTracks({
    limit: 9,
    time_range: 'short_term'
  });

  return [ ...usersSongs.items ];
}

// Get the User's Top Artists based on short term history in the Spotify API 
export async function usersTopArtists(authToken) {
  passAuthToken(authToken);

  const usersArtists = await SpotApi.getMyTopArtists({
    limit: 9,
    time_range: 'short_term'
  });

  return [...usersArtists.items];
}

// Get User's Availble Devices 
export async function usersDevices(authToken) {
  passAuthToken(authToken);

  const avalibleDevices = await SpotApi.getMyDevices();

  return avalibleDevices;
}

// Send generated Playlist to User's Selected Device
export function sendDatatoDevice(authToken, deviceId, trackList) {
  SpotApi.setAccessToken(authToken);

  SpotApi.play({
    device_id: deviceId,
    uris: trackList
  });
}


/* Playlist Functions  */ 

// Add the Generated Playlist to the User's account
export async function addPlaylist(authToken, userId, playlistName) {
  SpotApi.setAccessToken(authToken);

  const playlistInformation = await SpotApi.createPlaylist(userId, {
    name: playlistName
  });

  return playlistInformation;
}

// Add chosen Tracks to the Created Playlist 
export function addTracks(authToken, playlistId, trackUris) {
  SpotApi.setAccessToken(authToken);

  SpotApi.addTracksToPlaylist(playlistId, trackUris);
}

export async function spotifyApiRecommendations(authToken, options) {
  passAuthToken(authToken);

  const chosenTracks = await SpotApi.getRecommendations(options);

  return chosenTracks;
}

// Collect the Track Ids from albums, playlists, and track seeds
export async function getTrackIds(albumSeeds, playlistSeeds, trackSeeds) {

  // Store the tracks from Albumseeds file
    const tracksFromAlbumSeeds = await Promise.all(albumSeeds.map(async (album) => {
    const trackNumber = album.total_tracks;
    const pickRandomNumber = Math.floor(Math.random() * trackNumber);
    // Select a track from the chosen album for seeding 
    const albumRandomTrack = await SpotApi.getAlbumTracks(album.id, {
      limit: 1,
      offset: pickRandomNumber,
    })
    return albumRandomTrack.items[0].id;
  }));

  //Store the tracks from Playlist Seeds
  const tracksFromPlaylistSeeds = await Promise.all(playlistSeeds.map(async (playlist) => {
    const chosenTrack = playlist.tracks.total;
    const trackNumber = Math.floor(Math.random() * chosenTrack);
    const playlistTrack = await SpotApi.getPlaylistTracks(playlist.id, {
      limit: 1,
      offset: trackNumber,
    })
    return playlistTrack.items[0].track.id;
  }));

  // Get track Ids from Track Seeds
  const tracksFromTrackSeeds = trackSeeds.map(track => track.id);
  
  return [...tracksFromAlbumSeeds, ...tracksFromPlaylistSeeds, ...tracksFromTrackSeeds];
}


