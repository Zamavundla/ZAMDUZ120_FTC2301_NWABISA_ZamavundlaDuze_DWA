/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types'
import AudioPlayer from './AudioPlayer'
import LoadingSpinnerSVG from "../Toggle/LoadingSpinnerSVG";


const AudioSelector = ({ audioSrc, episodeTitle, showTitle }) => {
  const [showAudioPlayer, setShowAudioPlayer] = React.useState(false);

  const handleShowAudioPlayer = () => {
    setShowAudioPlayer(true);
  };

  const handleCloseAudioPlayer = () => {
    setShowAudioPlayer(false);
  };

  return (
    <div>
      <button onClick={handleShowAudioPlayer}>Play Audio</button>
      {showAudioPlayer && (
        <div>
          <button onClick={handleCloseAudioPlayer}>Close Audio Player</button>
          <h3>{showTitle}</h3>
          <h4>{episodeTitle}</h4>
          <AudioPlayer audioSrc={audioSrc} />
        </div>
      )}
    </div>
  );
};

AudioSelector.propTypes = {
  audioSrc: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  showTitle: PropTypes.string.isRequired,
};

export default AudioSelector;
