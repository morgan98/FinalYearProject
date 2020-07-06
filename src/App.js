/** APP.JS 
 * Main file of the application
 * contains all the states, props and components 
 * needed for the applciation
*/


import React, {Component} from 'react';
import {debounce} from 'lodash';
import {hashParams} from './util/Functions';

//Spotify API Endpoint Functions
import { passAuthToken,getTrackIds,UserDetails,
  usersTopTracks, usersTopArtists, spotifyApiRecommendations,
  usersDevices, sendDatatoDevice, addPlaylist, addTracks,
} from './util/Spotify';

// Static Text From JSON
import {applicationTitle} from './util/applicationText.json'

// Authenication Handling
import LoginButton from './components/spotifyLogin';
import Logout from './components/SpotifyLogout';

//UI Components
import Playback from './components/playback';
import SongValues from './components/songValues';
import PlaylistTracks from './components/playlistTracks';
import Seeds from './components/spotifySeeds/seeds';

// Search Components 
import ActivateSearchButton from './components/activateSearchButton';
import SearchFunction from './components/search/searchFunction';

class App extends Component {
  constructor(props) {
    super(props);
    // Set Inital Application Date, create the properties that will be used to store
    // Information from the API 
    this.state = {
      // Set Up Auth and get Access Token
      applicationAuth: false,
      // Strip accessToken from the URL 
      accessToken: hashParams().access_token,
      
      /* User Information Related Variables */ 
      // User account information prop
      usersAccountInformation: null,

      // user's Top Artists and songs
      usersSongs: null,
      usersArtists: null,

      // User Devices
      devices: [],
      chosenDevice: null,

      // Seed Arrays
      artistSeeds: [],
      albumSeeds: [],
      trackSeeds: [],
      playlistSeeds: [],
      
      // Handle Searching in memory
      currentlySearching: false,

      // Playlist Creation Handling 
      playlist_name: null,
      playlist_information: null,
      
      // Recomendation Tracklist storage
      recommendations: [],
      generatedPlaylist: null,

      //Song Values
      // Inital State of values
      init_Acoust_Value: null,
      init_Dance_Value: null,
      init_energy_Value: null,
      init_instru_Value: null,
      init_pop_Value: null,
      init_loudness_Value: null,
      init_valence_Value: null,
      
      // Handle Changing song values
      isDanceability: false,
      isValence: false,
      isInstrumentalness: false,
      isLoudness: false,
      isAcousticness: false,
      isPopularity: false,
      isEnergy: false
      
    };

    // User Related declarations
    // Collect user information
    this.CollectSpotifyUserInfo = this.CollectSpotifyUserInfo.bind(this);

    // Retrieve user's top tracks and artists 
    this.retrieveTopTracks  = this.retrieveTopTracks.bind(this);
    this.retrieveTopArtists = this.retrieveTopArtists.bind(this);

    // User Device Management
    this.getDevices = this.getDevices.bind(this);
    this.selectDevice = this.selectDevice.bind(this);
    this.sendToDevice = this.sendToDevice.bind(this);

    // Search Bar Related Variable declarations
    this.openSearchBar = this.openSearchBar.bind(this);

    // Seed Management
    this.removeseed = this.removeseed.bind(this);
    this.selectaSeed = this.selectaSeed.bind(this);

    // Collect Suggestions based on the seed(s)
    this.collectSpotifySuggestions = this.collectSpotifySuggestions.bind(this);

    // Recomendation handling 
    // Get API Recomendations
    this.collectApiRecommendations = debounce(this.collectApiRecommendations, 500);
    this.CreateRecommendations = this.CreateRecommendations.bind(this);
    this.recomendationManagement = this.recomendationManagement.bind(this);

    // Playlist Management 
    this.update_playlist_name = this.update_playlist_name.bind(this);
    this.create_playlist = this.create_playlist.bind(this);

    // Song Values
    this.toggleValues = this.toggleValues.bind(this);
    this.adjustSongValue = this.adjustSongValue.bind(this);
  }
  
  componentWillMount() {
    /** pushstate React Function used to remove parameters from the URL */
    window.history.pushState({}, document.title, "/");

    // check if the accessToken has been set in state
    if (this.state.accessToken) {
      this.setState({
        applicationAuth: true,
      });
      passAuthToken(this.state.accessToken);
    } else {
      this.setState({
        applicationAuth: false,
      });
    }
    // if the api access token is present, then pass into the collect user information function 
    if (this.state.accessToken) {
      this.CollectSpotifyUserInfo(this.state.accessToken);
    }
    
  }

  // Get the user's top tracks from the api and pass it into the application
  async retrieveTopTracks() {
    const spotifyApiTopTracks = await usersTopTracks(this.state.accessToken);

    this.setState({
      usersSongs: spotifyApiTopTracks
    });
  }

  // Get the user's top artists from the api and pass it into the application
  async retrieveTopArtists() {
    const spotifyApiTopArtists = await usersTopArtists(this.state.accessToken);

    this.setState({
      usersArtists: spotifyApiTopArtists
    });
  }

  // Get the user's information from the api and pass it into the application 
  async CollectSpotifyUserInfo() {
    const apiInfo = await UserDetails(this.state.accessToken);
    
    this.setState({
      usersAccountInformation: apiInfo
    });
  }

  // Present the user's top songs and artist as seed suggestions
  collectSpotifySuggestions() {
    if (this.state.usersSongs === null) {
      this.retrieveTopTracks();
    }
    
    if (this.state.usersArtists === null) {
      this.retrieveTopArtists();
    }
  }

  // Activate SearchBar
  openSearchBar() {
    this.setState({
      currentlySearching: !this.state.currentlySearching,
    });

    // Display suggestions based on user's top songs and artists
    this.collectSpotifySuggestions();
  }

  // Remove an Unwanted Seed
  removeseed(seed, seedType) {
    const choosenSeed = `${seedType}Seeds`;
    const updatedState = {};
    updatedState[choosenSeed] = this.state[choosenSeed].filter(item => item.id !== seed.id);
    this.setState(updatedState);
    this.recomendationManagement();
  }

  // Add a new Seed to the Recommendation selection
  selectaSeed(seed, seedType) {
    const selectedSeed = `${seedType}Seeds`;
    if (!this.state[selectedSeed].includes(seed)) {
      this.setState(lastState => {
        const updatedState = {};
        updatedState[selectedSeed] = [...lastState[selectedSeed], seed];
        updatedState.currentlySearching = false;
        this.setState(updatedState);
        this.recomendationManagement();
      })
    }
  }


  // Adjust the target values
  adjustSongValue(event, type) {
    const updatedState = {};
    updatedState[type] = event.target.value;
    this.setState(updatedState);

    if (this.state.trackSeeds.length
        || this.state.artistSeeds.length
        || this.state.albumSeeds.length
        || this.state.playlistSeeds.length) {
          this.recomendationManagement();
        }
  }

  toggleValues(event) {
    const selectedValue = event.target.innerText.toLowerCase();
    const selectedValueToggle = `is${event.target.innerText}`;
    const updatedState = {}
    updatedState[selectedValueToggle] = !this.state[selectedValueToggle];
    updatedState[selectedValue] = null;
    this.setState(updatedState);
  }

  async CreateRecommendations() {
    const song_ID = await getTrackIds(this.state.albumSeeds, this.state.playlistSeeds, this.state.trackSeeds);
    const artist_ID = this.state.artistSeeds.map(artist => artist.id);


    // Use the values from the seeds to set the values of the Song value sliders 
    const potentialRecomendation = {seed_artists: artist_ID,seed_tracks: song_ID,}
  
    if (this.state.init_Acoust_Value) {
      potentialRecomendation.target_acousticness = this.state.init_Acoust_Value;
    }
    if (this.state.init_Dance_Value) {
      potentialRecomendation.target_danceability = this.state.init_Dance_Value;
    }
    if (this.state.init_energy_Value) {
      potentialRecomendation.target_energy = this.state.init_energy_Value;
    }
    if (this.state.init_instru_Value) {
      potentialRecomendation.target_instrumentalness = this.state.init_instru_Value;
    }
    if (this.state.init_loudness_Value) {
      potentialRecomendation.target_loudness = this.state.init_loudness_Value;
    }
    if (this.state.init_pop_Value) {
      potentialRecomendation.target_popularity = this.state.init_pop_Value;
    }
    if (this.state.init_valence_Value) {
      potentialRecomendation.target_valence = this.state.init_valence_Value;
    }

    return potentialRecomendation;
  }

  async collectApiRecommendations() {

    const apiRecomendations = await this.CreateRecommendations();

    if (apiRecomendations.seed_artists.length > 0 || apiRecomendations.seed_tracks.length > 0) {
      const generatedPlaylist = await spotifyApiRecommendations(this.state.accessToken, apiRecomendations);
      this.setState({
        generatedPlaylist: generatedPlaylist.tracks
      });

    } else {
      this.setState({
        generatedPlaylist: []
      })
    }
  }

  recomendationManagement() {
    this.collectApiRecommendations();
  }

  async getDevices() {
    const avalibleDevices = await usersDevices(this.state.accessToken);
    
    this.setState({
      devices: avalibleDevices.devices,
    });
  }

  sendToDevice() {
    const authToken = this.state.accessToken;
    const deviceId = this.state.chosenDevice.id;
    const playlistSongs = this.state.generatedPlaylist.map(track => `spotify:track:${track.id}`);

    sendDatatoDevice(authToken, deviceId, playlistSongs);
  }

  selectDevice(device) {
    this.setState({
      chosenDevice: {
        id: device.id,
        name: device.name,
      }
    })
  }

  update_playlist_name(event) {
    this.setState({
      playlist_name: event.target.value
    });
  }

  async create_playlist() {
    const authToken = this.state.accessToken;
    const userId = this.state.usersAccountInformation.id;
    const playlist_name = this.state.playlist_name ? this.state.playlist_name : 'Created by SongLab';

    const playlist_information = await addPlaylist(authToken, userId, playlist_name);
    
    const playlistId = playlist_information.id;
    const trackUris = this.state.generatedPlaylist.map(track => `spotify:track:${track.id}`);

    addTracks(authToken, playlistId, trackUris);
  }

  render() {
    return (
      <div>
        <div className=" bg-black p-1 ">
          <div className="justify-start text-green container mx-auto">
            <h1>{applicationTitle}</h1>
          </div>
          <div className=" justify-right container mx-auto">
          {this.state.applicationAuth &&
                <Logout/> 
          }
          </div>
        </div>
        <div className="relative min-h-screen bg-black pt-8">
          <div className="container mx-auto">
          {!this.state.applicationAuth && 
              <LoginButton/>
          }

          {this.state.applicationAuth &&
            <div>
              <div className="flex mb-4">
                <div className="p-4 bg-white border-green rounded-t-md shadow-md w-1/4 ml-2 border-8 border-600">
                  <SongValues adjustSongValue={this.adjustSongValue}
                    toggleValues={this.toggleValues} 
                    adjustAcousticness={this.state.isAcousticness}
                    adjustDanceability={this.state.isDanceability}
                    adjustEnergy={this.state.isEnergy}
                    adjustInstrumentalness={this.state.isInstrumentalness}
                    adjustLoudness={this.state.isLoudness}
                    adjustPopularity={this.state.isPopularity}
                    adjustValence={this.state.isValence}
                    />
                </div>
                <div className="p-4 bg-white border-green rounded-tr-full rounded-tl-full w-1/2 ml-2 border-8 border-green border-600">
                  {!this.state.currentlySearching && (
                    <div className="flex flex-col items-center">
                      <Seeds songs={this.state.trackSeeds}
                        artistSeeds={this.state.artistSeeds}
                        albumSeeds={this.state.albumSeeds}
                        playlistSeeds={this.state.playlistSeeds} 
                        removeseed={this.removeseed}/>
                      <ActivateSearchButton openSearchBar={this.openSearchBar}/>
                    </div>
                  )}

                  { this.state.currentlySearching && 
                    <SearchFunction accessToken={this.state.accessToken}
                      openSearchBar={this.openSearchBar}
                      usersSongs={this.state.usersSongs}
                      usersArtists={this.state.usersArtists} 
                      selectaSeed={this.selectaSeed}/>
                  }
                </div>
                <Playback getDevices={this.getDevices}
                  selectDevice={this.selectDevice}
                  sendToDevice={this.sendToDevice}
                  devices={this.state.devices}
                  chosenDevice={this.state.chosenDevice}
                  usersAccountInformation={this.state.usersAccountInformation}
                  update_playlist_name={this.update_playlist_name} 
                  create_playlist={this.create_playlist} 
                  generatedPlaylist={this.state.generatedPlaylist} 
                  playlist_information={this.state.playlist_information} />
              </div>
              < PlaylistTracks generatedPlaylist={this.state.generatedPlaylist} />
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;





