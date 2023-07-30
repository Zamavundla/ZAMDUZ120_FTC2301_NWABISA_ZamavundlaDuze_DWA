/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecommendedEpisodes } from '../utils/api';
import { UserContext } from '../Toggle/Contexts';

export default function RecommendedEpisodes () {
  const [recommendedEpisodes, setRecommendedEpisodes] = useState([]);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        const recommendations = await fetchRecommendedEpisodes(user.id);
        setRecommendedEpisodes(recommendations);
      }
    };
    fetchRecommendations();
  }, [user]);

  return (
    <div>
      <h2>Recommended Episodes</h2>
      <ul>
        {recommendedEpisodes.map((episode) => (
          <li key={episode.id}>
            <Link to={`/show/${episode.showId}/season/${episode.seasonNumber}/episode/${episode.id}`}>
              {episode.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

