/** spotifyAuth.js 
 * This file handles user authenication at Spotify Services
 * The functions defined here are used in the login and logout javaScript files
*/

import { randomStringGen} from './Functions';


// Function for handling user authentication 
export function apiAuthentication() 
{
    const cliID = '83e64f5de7714643865644eca97606f8';
    const res_type = 'token';
    const apiAuthScopes = 'user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-follow-read user-follow-modify';
    const redirect = 'http://localhost:3000/callback';
    const storeInState = randomStringGen(16);

    //store current Autenication state in localStorage
    localStorage.setItem('spotify_auth_state', storeInState)

    // URL Handling for Autentication
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=' + encodeURIComponent(res_type);
    url += '&client_id=' + encodeURIComponent(cliID);
    url += '&scope=' + encodeURIComponent(apiAuthScopes);
    url += '&redirect_uri=' + encodeURIComponent(redirect);
    url += '&state=' + encodeURIComponent(storeInState);

    // Set 'url' as the location
    window.location = url;

}
// Function for handling logout 
export function appLogout()
{   
    // This window will open Spotify Services logout webpage in a new tab 
    const spot_logout = window.open('https://accounts.spotify.com/en/logout');
    spot_logout.focus();

    // Redirect Back to the Home Screen
    let url = 'http://localhost:3000/'
    window.location = url;
}
