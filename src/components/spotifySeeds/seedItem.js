/** SEEDITEM.js
 * This file contains the code to render
 * the seed items(e.g. an album)
 * in the Seed component
 */

import React from 'react';

const SeedItem = ({seed, seedType, removeseed}) => {
  switch (seedType) {
    // Album Seed 
    case 'album':
      return (
       <div className="seed bg-grey border-green rounded shadow-md flex items-center p-4 mr-4 mb-4 relative border-8 border-800">
           <div className="seed-item-cancel-button absolute pin-t pin-l bg-green-lighter p-2 rounded-lg flex flex-col justify center -mt-3 invisible opacity-2"
             onClick={() => removeseed(seed, seedType)}>
             <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
           </div>
         <img 
           className=" mr-4 h-16 w-16 "
           src={seed.images[1] ? seed.images[1].url : ''}
           // Alt-tag
           alt={seed.name}{...seed.artists[0].name}
           title={seed.name}/>
         <div>
           {/** Artist and Album names  */}
           <p className="font-menlo font-bold">{seed.artists[0].name}</p>
           <p className="font-semibold font-mono">{seed.name}</p>
         </div>
       </div>
      );

    // Song Seed 
    case 'track':
      return (
        <div className="seed bg-grey border-green rounded shadow-md flex items-center p-4 mr-4 mb-4 relative border-8 border-800">
          <div className="seed-item-cancel-button absolute pin-t pin-l bg-green-lighter p-2 rounded-lg flex flex-col justify center -mt-3 invisible opacity-2"
            onClick={() => removeseed(seed, seedType)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className="w-16 h-16 mr-4 shadow"
            src={seed.album.images[1] ? seed.album.images[1].url : ''}
            // Alt Tags 
            alt={seed.album.name}
            title={seed.album.name}/>
          <div>
            {/** Artist and song name  */}
            <p className="font-bold font-menlo">{seed.artists[0].name}</p>
            <p className="font-mono font-semibold">{seed.name}</p>
            
          </div>
        </div>
      )
      // Artist seed
    case 'artist':
      return (
        <div className="seed bg-grey border-green rounded shadow-md flex items-center p-4 mr-4 mb-4 relative border-8 border-800">
          <div className="seed-item-cancel-button absolute pin-t pin-l bg-green-lighter p-2 rounded-lg flex flex-col justify center -mt-3 invisible opacity-2"
            onClick={() => removeseed(seed, seedType)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className="w-16 h-16 mr-4 rounded-full"
            src={seed.images[1] ? seed.images[1].url : ''}
            alt={seed.name}
            title={seed.name}/>
          <div>
            <p className="font-menlo font-bold">{seed.name}</p>
          </div>
        </div>
      );
      
    //Playlist Seed 
    case 'playlist':
      return (
        <div className="seed bg-grey border-green rounded shadow-md flex items-center p-4 mr-4 mb-4 relative border-8 border-800">
          <div className="seed-item-cancel-button absolute pin-t pin-l bg-green-lighter p-2 rounded-lg flex flex-col justify center -mt-3 invisible opacity-2"
            onClick={() => removeseed(seed, seedType)}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className=" w-16 h-16 mr-4"
            src={seed.images[0] ? seed.images[0].url : ''}
            // Alt Tags 
            alt={seed.name}
            title={seed.owner}/>
          <div>
            {/** Playlist name and owner name */}
            <p className="font-mono text-green">{seed.name}</p>
            <p className="font-bold font-menlo">{seed.owner.display_name}</p>
          </div>
        </div>
      )
    default:
      break;
  }
}

export default SeedItem;