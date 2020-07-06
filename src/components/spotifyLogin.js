/** SPOTIFYLOGIN.js
 * This file contains the login button component
 * which onClick will take the user to Spotify Services
 * To authenicate and get an Access Token 
 */

import React from 'react';

import {apiAuthentication} from '../util/spotifyAuth';

//Static Text Imported from JSON
import {introHeadline, instructions, introduction, seedsExplaination, 
        songValuesExplaination, playbackExplaination, seedsTitle,
        playbackTitle, songValuesTitle, loginButtonText} from '../util/applicationText.json';

// Button on the Static Login page
// User taken to Spotify to authorise access
// To Their Account
const LoginButton = () => {
    // Present the instructions from the JSON File 
    return (
        <div className ="bg-white border-green p-4 rounded-r-full ml-2 border-8 border-600">
            <h1 ClassName = "font-mono">{introHeadline}</h1>
            <div ClassName = " mb-56 justify-center p-56">
                {introduction}
            </div>
            <div ClassName="mb-10 text-justify font-bold  py-40">
                <h2>{instructions}</h2>
            </div>
            <div ClassName="mb-10 text-justify  py-40">
                <h3>{seedsTitle}</h3>
            </div>
             <div ClassName = " mb-56 text-justify  p-24">    
                {seedsExplaination}
            </div> 
            <div ClassName="mb-10 text-justify font-bold py-40">
                <h3>{songValuesTitle}</h3>
            </div> 
            <div ClassName = " mb-56 text-justify p-24">   
                {songValuesExplaination}
            </div>
            <div ClassName="mb-10 text-justify font-bold py-40">
                <h3 ClassName="font-menlo">{playbackTitle}</h3>
            </div>
            <div ClassName= " mb-56 text-justify p-24">
                {playbackExplaination}
            </div>
                
        {/** Button Container */}
        <div className=" w-full mb-10 p-10 ">
        <button
            className="bg-green-lighter border-green border-8 border-100 p-4 square rounded-r-full "
            onClick={apiAuthentication}>
                {loginButtonText}
            </button>
            </div>
            </div>
        )
        };
export default LoginButton;