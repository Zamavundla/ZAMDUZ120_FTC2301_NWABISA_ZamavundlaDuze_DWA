/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import SeasonView from '../Seasons/SeasonView';

export default function BrowseAllCards() {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowEpisodes, setSelectedShowEpisodes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        const data = await response.json();
        setPreviews(data.shows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching previews:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchShowAndEpisodes = async (showId) => {
    try {
      // Fetch show details
      const showResponse = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const showData = await showResponse.json();

      // Fetch episodes for the show
      const episodesResponse = await fetch(`https://podcast-api.netlify.app/shows/${showId}/episodes`);
      const episodesData = await episodesResponse.json();

      // Add episodes to the show data
      showData.episodes = episodesData;

      return showData;
    } catch (error) {
      console.error(`Error fetching show and episodes for ID ${showId}:`, error);
      return null;
    }
  };

  const handleShowDetails = async (showId) => {
    if (!selectedShowEpisodes[showId]) {
      const showData = await fetchShowAndEpisodes(showId);
      if (showData) {
        setSelectedShowEpisodes((prevEpisodes) => ({ ...prevEpisodes, [showId]: showData.episodes }));
      }
    }
  };

  return (
    <div>
      <h1>All Podcast Shows:</h1>
      {loading ? (
        <LoadingSpinnerSVG />
      ) : (
        previews.map((preview) => (
          <div key={preview.id}>
            <h2>{preview.title}</h2>
            <p>Description: {preview.description}</p>
            <img src={preview.image} alt={preview.title} style={{ maxWidth: '200px' }} />
            <p>Genres: {preview.genres.join(', ')}</p>
            <p>Updated: {preview.updated}</p>
            <button onClick={() => handleShowDetails(preview.id)}>Show Details</button>
            <hr />
          </div>
        ))
      )}
      {Object.keys(selectedShowEpisodes).map((showId) => (
        <div key={showId}>
          <h2>{selectedShowEpisodes[showId].title}</h2>
          <p>Description: {selectedShowEpisodes[showId].description}</p>
          <p>Seasons: {selectedShowEpisodes[showId].seasons.length}</p>
          <img src={selectedShowEpisodes[showId].image} alt={selectedShowEpisodes[showId].title} style={{ maxWidth: '200px' }} />
          <p>Genres: {selectedShowEpisodes[showId].genres.join(', ')}</p>
          <p>Updated: {selectedShowEpisodes[showId].updated}</p>
          {selectedShowEpisodes[showId] && <SeasonView episodes={selectedShowEpisodes[showId].episodes} />}
          <hr />
        </div>
      ))}
    </div>
  );
}
