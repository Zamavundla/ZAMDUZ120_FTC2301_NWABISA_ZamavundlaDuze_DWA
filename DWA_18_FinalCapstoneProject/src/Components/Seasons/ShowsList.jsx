/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShowsList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        // Fetch all shows data from the API
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchAllShows();
  }, []);

  return (
    <div>
      <h2>Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
              <p>{show.title}</p>
              {show.seasons && <p>Seasons: {show.seasons}</p>}
              {show.updated && <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>}
              {show.genres && <p>Genres: {show.genres.join(', ')}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
