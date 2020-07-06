/** SEARCHBOX.js 
 * file renders the searchbox on seed selection/search screen
*/

import React from 'react';

const SearchBox = (props) => {
  return (
    <input className="border-green h-10 px-10 w-full rounded-full border-8 border-300 font-black text-center"
      type="text"
      placeholder="search..."
      // Carry out the search with the Spotify API
      onChange={props.searchManagement} />
  )
}

export default SearchBox;