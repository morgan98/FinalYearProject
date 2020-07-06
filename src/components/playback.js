import React from 'react';

import {playbackTitle} from '../util/applicationText.json'

// File for handling the UI of the playback component 
class Playback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceSelection: false,
    }
  }

  componentWillMount() {
    this.props.getDevices();
  }

  render() {
    return (
      <div className="p-4 bg-white border-green shadow-md w-1/4 ml-4 border-8 border-600">
        <h3 className="w-full mb-4 font-mono">{playbackTitle}</h3>
        {/** Get the User's infromation from the API */}
        {this.props.devices.length > 0 
          && this.props.apiUserInformation
          && this.props.apiUserInformation.product === "premium" 
          && this.props.generatedPlaylist
          && this.props.generatedPlaylist.length > 0
          && (
          <div>
            {/** Persent the use */}
            <div className={this.state.deviceSelection ? "p-4 rounded shadow-md mb-4" : ""}>
            {!this.state.deviceSelection && (
              <button className="mb-4 text-center p-2 bg-grey-lighter shadow-md rounded w-full"
                onClick={() => {
                  this.props.getDevices();
                  this.setState({
                    deviceSelection: !this.state.deviceSelection,
                  });
                }}>
                {this.props.chosenDevice ? this.props.chosenDevice.name : 'Choose a device'}
              </button>
            )}
            {this.state.deviceSelection
              && this.props.devices.length > 0 && (
              <ul className="list-reset">
                {this.props.devices.length > 0 && this.props.devices.map((device, idx, arr) => {
                  const lastDev = arr.length - 1 === idx;
                  const firstClassName= "p-2 bg-green w-full rounded shadow-md mb-4 text-center cursor-pointer"
                  const lastClassName = "p-2 bg-green w-full rounded shadow-md text-center cursor-pointer"
                  return (
                    <li className={lastDev ? lastClassName : firstClassName}
                      key={device.id}
                      onClick={() => {
                        this.props.selectDevice(device);
                        this.setState({
                          deviceSelection: !this.state.deviceSelection,
                        });
                      }}>
                      {device.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
            <button className="bg-green p-4 w-full mb-8"
              onClick={this.props.sendToDevice}>
              Play!
            </button>
          </div>
        )}
        {this.props.generatedPlaylist 
          && this.props.generatedPlaylist.length > 0
          && (
            <div>
            <input className="p-2 rounded shadow-md w-full mb-4"
              type="text"
              placeholder="name your playlist..."
              onChange={this.props.update_playlist_name} />
            <button className="bg-green p-4 w-full mb-8 font-bold"
              onClick={this.props.create_playlist}>
              Save Playlist to Spotify
            </button>
          </div>
        )}
      </div>
      
    )
  }
}

export default Playback;