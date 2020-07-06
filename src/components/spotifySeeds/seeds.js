/** SEEDS.js
 * Tales the seed information from the API
 * and creates them as objects in the application
 */
import React from 'react';

import SeedItem from './seedItem';

import {seedsTitle} from '../../util/applicationText.json'

// Declare seed objects stored in state
const Seeds = ({ removeseed, artistSeeds, albumSeeds, playlistSeeds, songs}) => {
  return (

    
    <div>
      <h3 className="w-full mb-4 font-mono">{seedsTitle}</h3>
      <div className="flex flex-wrap w-full justify-center">
        {/** Album Seed */}
        {albumSeeds.length > 0 
        && 
        albumSeeds.map(album => 
        <SeedItem 
        removeseed={removeseed}
        seed={album} 
        seedType='album'
        key={album.id} 
        />
        )}

        {/** Artist seed */}
        {artistSeeds.length > 0 
        && 
        artistSeeds.map(artist => 
        <SeedItem 
        removeseed={removeseed}
        seed={artist} 
        seedType='artist'
        key={artist.id}
        />
        )}

        {/** Playlist Seed */}
        {playlistSeeds.length > 0 
        && 
        playlistSeeds.map(playlist => 
        <SeedItem 
        removeseed={removeseed}
        seed={playlist} 
        seedType='playlist'
        key={playlist.id} 
        />)}

        {/** Song Seed */}
        {songs.length > 0 
        && 
        songs.map(track => 
        <SeedItem
        removeseed={removeseed}
        seed={track} 
        seedType='track'
        key={track.id} 
        />
        )}
      </div>
    </div>
  )
}

export default Seeds;