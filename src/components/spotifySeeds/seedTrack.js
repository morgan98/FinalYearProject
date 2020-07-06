import React from 'react';

const TrackSeed = ({track}) => {
  return (
    <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4">
      <img 
        className="w-16 h-16 mr-4"
        src={track.album.images[1] ? track.album.images[1].url : ''}
        title={track.name}/>
      <div>
        <p className="font-bold font-mono">{track.name}</p>
        <p className="font-thin font-menlo">{track.artists[0].name}</p>
      </div>
    </div>
  )
}

export default TrackSeed;