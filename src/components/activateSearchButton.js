import React from 'react';

const ActivateSearchButton= (props) => {
  return (
    <button className="bg-green-lighter p-2 rounded-r-full flex flex-col justify center mb-3"
      onClick={props.openSearchBar}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </button>
  )
}

export default ActivateSearchButton;