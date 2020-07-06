/** SEARCHARTISTS.js
 * Displays results of Artists
 * on the Search screen
 */
import React from 'react';

const ArtistResult = ({item, selectaSeed }) => {
  return (
    <li className="items-center flex mb-2 w-1/2"
      //Seed type equals artist
      onClick={() => selectaSeed(item, 'artist')}>
      <img className="w-12 h-12 mr-4 rounded-lg"
      src={item.images[1] ? item.images[1].url : ''} 
      
      // Image Tags
      alt={item.name}
      title={item.name}/>
      <div>
        <p className="font-semibold font-menlo">{item.name}</p>
      </div>
    </li>
  )
}

export default ArtistResult;