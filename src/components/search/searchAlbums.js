/** SEARCHALBUMS.js
 * Used for displaying the
 * albums results on the 
 * search results screen
 */

import React from 'react';

const SearchAlbum = ({item, selectaSeed}) => 
{
  return (
    <li className=" flex items-center mb-4 w-1/2"
      onClick={() => selectaSeed(item, 'album')}>
      <img className="w-12 h-12 mr-4 rounded-lg"
      src={item.images[1] ? item.images[1].url : ''}
      /** Add tag to image */
      alt= {item.name}
      title= {item.name}/>

      {/** Present artist and album name */}
      <div>
        <p className="font-semibold font-menlo">{item.artists[0].name}</p>
        <p className="font-bold font-mono">{item.name}</p>
      </div>

    </li>
  )
}

export default SearchAlbum;