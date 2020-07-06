/** SearchFunction.js
 * handles the search functionality 
 * of the application
 * made up of multiple parts/components
 */

import React from 'react';

import {debounce} from 'lodash';
import {SpotApi} from '../../util/Spotify';

// Search Function Components
import SearchBox from './searchBox';
import SearchPlaylist from './searchPlaylist';
import SearchArtist from './searchArtists';
import SearchTrack from './searchTracks';
import SearchAlbum from './searchAlbums';
import Suggestions from './suggestions'; 


class SearchFunction extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        //store results as property 
        results: null,
      }
      
      // Set API Auth 
      SpotApi.setAccessToken(this.props.accessToken);
      
      // manage search, and use search function from Spotify API JS Library 
      this.searchManagement = this.searchManagement.bind(this);
      this.searchSpotify = debounce(this.searchSpotify, 500);
    }
  
    searchSpotify(value) {
      // Search for albums, artists, playlists, and tracks
      SpotApi.search(value, ['track', 'playlist', 'album', 'artist',], 
      // Limit the result to six each item from the API
      { limit: 6}).then((data) => {
        this.setState({
          //store the results
           results: data,})
        }, (err) => {
          console.error(err);
        });
    }
  
    searchManagement(event) {
      this.searchSpotify(event.target.value);
    }
  
    render() {
      return (
        <div className="absolute pin bg-black pt-8">
          <div className="p-3 bg-white border-green w-125 border-8 border-600">

          <div className="container mx-auto flex items-center flex mb-12  ">
            {/** Search Bar component */}
            <SearchBox 
            searchManagement={this.searchManagement} />
            {/** Search Button  */}
            <button 
              className="ml-4 bg-green-lighter w-10 h-10  flex flex-col justify-center items-center"
              onClick={this.props.openSearchBar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </button>
          </div>

          {!this.state.results && 
          <div className=" bg-grey-lighter border-green container mx-auto border-8 border-200">
            {/** present The user's with their top songs and artists */}
            <Suggestions selectaSeed={this.props.selectaSeed} usersArtists={this.props.usersArtists} usersSongs={this.props.usersSongs} />
          </div>
          }

          {/** Present Songs on results screen  */}
          {this.state.results &&
          <div className="container mx-auto flex flex-wrap border-green  border-8 border-800">
            {/** Present artists in the results screen  */}
            <div className="p-4 w-1/2">
              <h3 className="mb-2 font-mono">Artists</h3>
              <ul className="flex flex-wrap list">
                {this.state.results.artists && this.state.results.artists.items.map(item => (
                  <SearchArtist selectaSeed={this.props.selectaSeed} item={item} key={item.id} />
                ))}
              </ul>
            </div>
            
            {/** Present songs on the results screen */}
            <div className=" p-4 w-1/2">
              <h3 className="mb-2 font-mono">Songs</h3>
              <ul className=" flex flex-wrap list ">
                {this.state.results.tracks && this.state.results.tracks.items.map(item => (
                  <SearchTrack selectaSeed={this.props.selectaSeed} item={item}key={item.id}/>
                ))}
              </ul>
            </div>

            {/** Present albums in the results screen */}
            <div className="p-4 w-1/2">
              <h3 className="mb-2 font-mono">Albums</h3>
              <ul className="flex flex-wrap lists">
                {this.state.results.albums && this.state.results.albums.items.map(item => (
                  <SearchAlbum selectaSeed={this.props.selectaSeed} item={item} key={item.id} />
                ))}
              </ul>
            </div>

            {/** Present playlists in the results screen */}
            <div className=" p-4 w-1/2">
              <h3 className="mb-2 font-mono">Playlists</h3>
              <ul className="flex flex-wrap list">
                {this.state.results.playlists && this.state.results.playlists.items.map(item => (
                  <SearchPlaylist  selectaSeed={this.props.selectaSeed}  item={item} key={item.id} />
                ))}
              </ul>
            </div>
          </div>
          }
          </div>
        </div>
      )
    }
  }
  
  export default SearchFunction;