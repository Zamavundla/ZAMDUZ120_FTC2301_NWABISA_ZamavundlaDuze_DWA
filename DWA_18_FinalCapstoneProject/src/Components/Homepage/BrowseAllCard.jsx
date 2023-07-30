/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function BrowseAllCards() {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/shows`);
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div>
      <h1>All Podcast Shows:</h1>
      {shows.map((show) => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <p>Description: {show.description}</p>
          <p>Seasons: {show.seasons}</p>
          <img src={show.image} alt={show.title} style={{ maxWidth: '200px' }} />
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Updated: {show.updated}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}