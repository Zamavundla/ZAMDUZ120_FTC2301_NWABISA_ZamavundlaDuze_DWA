/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AudioPlayer from '../Audio/AudioPlayer';
import AudioSelector from '../Audio/AudioSelector';

/**
 * Functional component representing the view for a season's episodes.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.episodes - The array of episode details for the season.
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function SeasonView({ episodes }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  /**
   * Toggles the favorite status of an episode.
   * @param {string} episodeId - The ID of the episode.
   * @function
   */
  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      setFavorites(favorites.filter((id) => id !== episodeId));
    } else {
      setFavorites([...favorites, episodeId]);
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to Show</button>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>
            {episode.title}
            <button onClick={() => toggleFavorite(episode.id)}>
              {favorites.includes(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </h3>
          {episode.updated && <AudioPlayer audioSrc={episode.updated} />}

          {/* Add the audio button here */}
          {episode.audio && (
            <AudioSelector
              audioSrc={episode.audio}
              episodeTitle={episode.title}
              showTitle={episode.showTitle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Prop types for the SeasonView component.
 * @typedef {Object} SeasonViewProps
 * @property {Array} episodes - The array of episode details for the season.
 */

/**
 * PropTypes for the SeasonView component.
 * @type {SeasonViewProps}
 */
SeasonView.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      updated: PropTypes.string, // Make the 'updated' prop optional
      // Add other episode properties if necessary
    })
  ).isRequired,
};

/**
 * Default props for the SeasonView component.
 * @type {SeasonViewProps}
 */
SeasonView.defaultProps = {
  episodes: [], // Provide a default empty array here or set it to any other default value as needed.
};
