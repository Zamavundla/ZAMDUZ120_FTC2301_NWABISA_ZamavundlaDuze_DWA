/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GenresList from '../Seasons/GenresList';
import AudioSelector from '../Audio/AudioSelector';
import SeasonSelector from '../Seasons/SeasonSelector';
import SeasonView from '../Seasons/SeasonView';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

const thumbsStyle = {
  marginRight: '1rem',
  cursor: 'pointer',
};

const BrowseAllCards = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowEpisodes, setSelectedShowEpisodes] = useState({});
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the API
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setPreviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const fetchShowAndEpisodes = async (showId) => {
    try {
      // Fetch show details
      const showResponse = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const showData = await showResponse.json();
      return showData;
    } catch (error) {
      console.error('Error fetching show details:', error);
      return null;
    }
  };

  const handleShowDetails = async (showId) => {
    if (!selectedShowEpisodes[showId]) {
      const showData = await fetchShowAndEpisodes(showId);
      if (showData) {
        setSelectedShowEpisodes((prevEpisodes) => ({
          ...prevEpisodes,
          [showId]: showData,
        }));
      }
    }
    setSelectedShowId(showId);
  };

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const handleAddToFavorites = (showId, isLiked) => {
    // Implement your favorites functionality here
    console.log(`Show ${showId} was ${isLiked ? 'liked' : 'disliked'}.`);
  };

  return (
    <div>
 <h1>All Podcast Shows: 
        <nav>        
          <button onClick={() => navigate('/home')} style={{ fontSize: '12px' }}>Go Back</button>
        </nav>
      </h1>      {loading ? (
        <LoadingSpinnerSVG />
      ) : (
        previews.map((preview) => (
          <div key={preview.id}>
            <h2>{preview.title}</h2>
            <p>Description: {preview.description}</p>
            <img src={preview.image} alt={preview.title} style={{ maxWidth: '200px' }} />
            <GenresList genreIds={preview.genres} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Thumbs-up and thumbs-down emojis with spacing */}
              <span
                style={thumbsStyle}
                role="img"
                aria-label="Thumbs Up"
                onClick={() => handleAddToFavorites(preview.id, true)}
              >
                👍
              </span>
              <span
                style={thumbsStyle}
                role="img"
                aria-label="Thumbs Down"
                onClick={() => handleAddToFavorites(preview.id, false)}
              >
                👎
              </span>
              <div>
                <p style={{ marginRight: '1rem' }}>Updated: {preview.updated}</p>
                <button onClick={() => handleShowDetails(preview.id)}>Show Details</button>
              </div>
              {/* Audio button */}
              <AudioSelector audioSrc={preview.audio} episodeTitle={preview.title} showTitle={preview.title} />
            </div>
            <hr />
            {selectedShowId === preview.id && (
              <div>
                <p>Seasons: {preview.seasons}</p>
                <img src={preview.image} alt={preview.title} />
                <p>{preview.description}</p>
                <SeasonSelector seasons={preview.seasons} onSelectSeason={handleSelectSeason} />
                <h3>Episodes for Season {selectedSeason}:</h3>
                <SeasonView
                  episodes={selectedShowEpisodes[preview.id]?.episodes.filter(
                    (episode) => episode.seasonNumber === selectedSeason
                  )}
                  selectedSeason={selectedSeason}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseAllCards;
