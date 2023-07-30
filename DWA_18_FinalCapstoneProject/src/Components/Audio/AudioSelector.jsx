/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types'
import AudioPlayer from './AudioPlayerr'


export default function AudioSelector ({ shows }) {
    const [selectedShowId, setSelectedShowId] = React.useState(null);
  
    const handleSelectShow = (showId) => {
      setSelectedShowId(showId);
    };
  
    return (
      <div>
        <h2>Select a Show</h2>
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <button onClick={() => handleSelectShow(show.id)}>{show.title}</button>
            </li>
          ))}
        </ul>
        {selectedShowId && (
          <div>
            <h3>{shows.find((show) => show.id === selectedShowId).title}</h3>
            <AudioPlayer audioSrc={shows.find((show) => show.id === selectedShowId).updated} />
          </div>
        )}
      </div>
    );
  }
  
  AudioSelector.propTypes = {
    shows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  