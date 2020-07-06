import React from 'react';

/** This File handles the presentation 0f the Generated Recommendations */

// Get Static Text from JSON 
import {playlistTitle} from '../util/applicationText.json';

const PlaylistTracks = ({generatedPlaylist}) => {
  return (
    // Container for the component 
    <div className=" container bg-white border-green rounded-lg p-4 b-3 border-8 border-600">
      <h3 className="w-full mb-4 font-mono">{playlistTitle}</h3>
      {/* Present the recommendations as a list */}
      <ul className="list">
        {/* Generatedplaylist - prop that contains the recommendation songs from the API Recommendation Engine */}
        {generatedPlaylist 
        && 
        generatedPlaylist.map((track) => 
        { 
        /* Cards */
         return (
            <li className="bg-grey rounded-r-full flex items-right justify-between p-4 mb-4" key={track.id}>
              <div className="items-left flex">
                <img className="w-16 h-16 mr-5 rounded-lg shadow-md "
                  // Get album artwork  from API
                  src={track.album.images[1] ? track.album.images[1].url : ''} alt={track.name} title={track.name}/>
                  <div>
                  {/* Get album name and artist name */}
                  <p className="font-mono fond-bold">{track.name}</p>
                  <p className="font-semibold font-menlo ">{track.artists[0].name}</p>
                 </div>
                 </div>
                 </li>
                 )
                })}
               </ul>
               </div>
               )
              }

export default PlaylistTracks;