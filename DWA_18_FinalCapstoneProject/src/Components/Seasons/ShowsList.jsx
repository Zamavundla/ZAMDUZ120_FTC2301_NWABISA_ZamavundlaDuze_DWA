/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShows } from '../Homepage/BrowseAllCards';

export default function ShowsList () {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchAllShows = async () => {
      const allShows = await fetchShows();
      setShows(allShows);
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
              <img src={show.imageUrl} alt={show.title} />
              <p>{show.title}</p>
              <p>Seasons: {show.seasons}</p>
              <p>Last Updated: {new Date(show.lastUpdated).toLocaleDateString()}</p>
              <p>Genres: {show.genres.join(', ')}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}