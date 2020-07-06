import React from 'react';

// Import Text from JSON
import {songValuesTitle, SV1, SV2, SV3, SV4, SV5, SV6, SV7} from '../util/applicationText.json' 


//Class for rendering the UI component Song Values
class SongValues extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {  adjustSongValue ,toggleValues,adjustAcousticness,adjustDanceability, adjustEnergy,
      adjustInstrumentalness, adjustLoudness, adjustPopularity, adjustValence
    } = this.props;

    //Consts for handling when a button is or isn't active
    const buttonNotActive = "bg-grey p-2 w-full mb-4 rounded-lg border-grey-dark border-8 border-600";
    const activeButton = "bg-green rounded-lg p-2 w-full mb-4 border-green border-8 border-600";
    
    return (
      <div>
        <h3 className="w-full mb-4 font-mono">{songValuesTitle}</h3>
        {/* Acousticness Slider */}
        <div>
          <button className={adjustAcousticness ? activeButton : buttonNotActive} 
          onClick={toggleValues}>
            Acousticness
          </button>
          {/* Spotify API information */}
          {adjustAcousticness && (
            <input className="w-full mb-4 font-mono" type="range"  defaultValue =".50" name="acoustic_slider"
              id="slider1" min="0" max="1" step=".01"
              onChange={(event) => adjustSongValue (event, 'slider1')}
              />
          )}
        </div>


        <div>
          {/** Danceability Slider */}
          <button className={adjustDanceability ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            {SV2}
          </button>
          {/* Spotify API information */}
          {adjustDanceability && (
            <input className="w-full mb-4 font-mono" type="range" name="danceability_slider" id="slider2" defaultValue =".50"
              min="0" max="1" step=".01"
              onChange={(event) => adjustSongValue (event,'slider2')}
              />
          )}
        </div>


        <div>
          {/* Energy Slider */}
          <button className={adjustEnergy ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            {SV3}
          </button>
          {/* Spotify API information */}
          {adjustEnergy && (
            <input className="w-full mb-4 font-mono" type="range" name="energy_slider"
              id="slider3" min="0" defaultValue =".50" max="1" step=".01"
              onChange={(event) => adjustSongValue (event, 'slider3')}
            />
          )}
        </div>


        <div>
          {/* Instrumentalness */}
          <button className={adjustInstrumentalness ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            {SV4}
          </button>
          {/* Spotify API information */}
          {adjustInstrumentalness && (
            <input className="w-full mb-4 font-mono" type="range" name="instrumentalness_slider"
            id="slider4" defaultValue =".50" min="0" max="1" step=".01"
            onChange={(event) => adjustSongValue (event, 'slider4')}
            />
            )}
        </div>


        <div>
        {/* Popularity Slider */}
          <button className={adjustPopularity ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            {SV5}
          </button>
          {/* Spotify API information */}
          {adjustPopularity && (
            <input className="w-full mb-4 font-mono" type="range" name="popularity_slider"
              id="slider5" defaultValue ="75" min="0" max="100" step="1"
              onChange={(event) => adjustSongValue (event, 'slider5')}
              />
          )}
        </div>


        <div>
          {/* Loudness Slider */}
          <button className={adjustLoudness ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            {SV6}
          </button>
          {/* Spotify API information */}
          {adjustLoudness && (
            <input className="w-full mb-4 font-mono" type="range" name="loudness_slider" id="slider6"
              defaultValue ="-30" min="-60" max="0" step="1"
              onChange={(event) => adjustSongValue (event, 'slider6')}
            />
          )}
        </div>


        <div>
          {/* Valence Slider */}
          <button className={adjustValence ? activeButton : buttonNotActive}
            onClick={toggleValues}>
            Valence
          </button>
          {/* Spotify API information */}
          {adjustValence && (
            <input className="w-full mb-4 font-mono" type="range" name="valence_slider" id="slider7"
              defaultValue =".50" min="0" max="1" step="0.01"
              onChange={(event) => adjustSongValue (event,'slider7')}
              />
          )}
        </div>
      </div>
    )
  }
}

export default SongValues;