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

  const fetchShow = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching show ${showId}:`, error);
      return null;
    }
  };

  const handleShowDetails = async (showId) => {
    const showData = await fetchShow(showId);
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
          <hr />
        </div>
      ))}
    </div>
  );
}
