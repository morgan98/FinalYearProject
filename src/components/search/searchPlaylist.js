/** SEARCHPLAYLIST.js 
 * file handles the search results of playlists
 * on the search results screen
*/

import React from 'react';

const PlaylistResult = ({item, selectaSeed}) => {
  return (
    // Set seed item to playlist 
    <li className="items-center  flex mb-2 w-1/2"
      onClick={() => selectaSeed(item, 'playlist')} >
      <img className="w-12 h-12 mr-4 rounded-lg"
      src={item.images[0] ? item.images[0].url : ''} 
      // Alt Tags for images
      alt= {item.name}
      title= {item.name}
      />
      {/** display playlist name and owner name */}
      <div>
        <p className="font-bold font-mono">{item.name}</p>
        <p className="font-semi-bold font-menlo">{item.owner.display_name}</p>
      </div>
    </li>
  )
}

export default PlaylistResult;