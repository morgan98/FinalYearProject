/** SUGGESTIONS.js
 * This file is used to display the user's
 * top artists and songs on the 
 * seed selection screen
 */

import React from 'react';

const userSuggestions = ({ usersSongs, usersArtists,selectaSeed}) => 
{
  return (
    // User's Top Artists 
    <div>
<h3 className="mb-4 font-mono text-center font-black"> Your Favourite Artists</h3>
      <div className=" w-full justify-center flex-wrap flex flex-wrap mb-8">
        {/** Map user artists to the screen */}
        {usersArtists && usersArtists.map(artist => (
          <div className=" p-4 w-1/3"
            key={artist.id}>
              {/** seed type artist */}
            <div className="border-grey-darker border-shadow bg-grey flex items-center p-4 border-8 border-100"
              onClick={() => selectaSeed(artist, 'artist')}>
              <img 
                className="w-16 h-16 mr-4 rounded-full"
                src={artist.images[1] ? artist.images[1].url : ''}

                // Alt-tags for image 
                alt={artist.name}
                title={artist.name}/>
              <div>
                <p className="font-bold font-mono">{artist.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


        {/** User's top songs  */}
      <h3 className="mb-4 font-mono text-center font-black">Your Favourite Songs</h3>
      <div className="w-full justify-center flex-wrap flex  mb-8 ">
        {usersSongs && usersSongs.map(track => (
          <div className=" p-4 w-1/3"
            key={track.id}>
              {/** seed type is track */}
            <div className="bg-grey border-grey-darker border-shadow flex items-center p-6 cursor-pointer border-8 border-100"
              onClick={() => selectaSeed(track, 'track')}>
              <img 
                className="w-16 h-16 mr-4 rounded-full "
                src={track.album.images[1] ? track.album.images[1].url : ''}

                //alt-tags 
                alt={track.album.images}
                title= {track.album.name}/>
              <div>
                {/** Present artist and song name */}
                <p className="font-thin font-menlo">{track.artists[0].name}</p>
                <p className="font-bold font-mono">{track.name}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default userSuggestions;