/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import PropTypes from 'prop-types'; 
import AudioPlayer from './AudioPlayer';

export default function SeasonView({ episodes }) {
  const history = useHistory();
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      setFavorites(favorites.filter((id) => id !== episodeId));
    } else{
      setFavorites([...favorites, episodeId]);
    }
  }
  return (
    <div>
      <button onClick={() => history.goBack()}>Back to Show</button>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>
            {episode.title}
            <button onClick={() => toggleFavorite(episode.id)}>{favorites.includes(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            </h3>
          <AudioPlayer audioSrc={episode.updated} />
        </div>
      ))}
    </div>
  );
}

// Add prop type validation
SeasonView.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      // Add other episode properties if necessary
    })
  ).isRequired,
};
