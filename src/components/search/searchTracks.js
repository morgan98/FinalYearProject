/** SEARCHTRACKS
 * File for handling songs on Search
 * result screen
 */

import React from 'react';

const searchTracks = ({item, selectaSeed}) => {
  return (
    <li className="w-1/2 flex items-center mb-4 cursor-pointer"
      // seed type is track 
      onClick={() => selectaSeed(item, 'track')}>
      <img className="w-12 h-12 mr-4 rounded-lg"
      // Alt-tags for image 
      src={item.album.images[1] ? item.album.images[1].url : ''}
      alt={item.album.name}
      title={item.album.name}/>

      {/** Display Artist name and track */}
      <div>
        <p className="font-semibold font-menlo">{item.artists[0].name}</p>
        <p className="font-bold font-mono">{item.name}</p> 
      </div>
    </li>
  )
}

export default searchTracks;