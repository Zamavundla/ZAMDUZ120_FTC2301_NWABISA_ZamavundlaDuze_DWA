/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { fetchShows } from '../Components/BrowseAllCard'; 

export default function LoadingState() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShows(); 
      setShows(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
