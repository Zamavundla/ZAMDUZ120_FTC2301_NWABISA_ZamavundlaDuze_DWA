/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function BrowseAllCards() {
  const [previews, setPreviews] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        const data = await response.json();
        setPreviews(data);
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
    const showData = await fetchShowAndEpisodes(showId);
    if (showData) {
      setShows((prevShows) => [...prevShows, showData]);
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
      {shows.map((show) => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <p>Description: {show.description}</p>
          <p>Seasons: {show.seasons.length}</p>
          <img src={show.image} alt={show.title} style={{ maxWidth: '200px' }} />
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Updated: {show.updated}</p>
          {/* Render episodes here */}
          <hr />
        </div>
      ))}
    </div>
  );
}
