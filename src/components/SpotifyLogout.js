import React from 'react';
import {appLogout} from '../util/spotifyAuth';

const Logout = () => {
    return (
        <button
            className="p-1 font-semibold rounded-lg text-green Font-mono"
            onClick={appLogout}>
                logout
            </button>
        
    )

};
export default Logout;