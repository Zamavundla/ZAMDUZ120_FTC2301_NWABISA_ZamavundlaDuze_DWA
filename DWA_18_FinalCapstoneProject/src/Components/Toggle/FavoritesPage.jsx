/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchEpisodeById, fetchShowById } from '../Homepage/BrowseAllCard';
import supabase from './Supabase';
import { UserContext } from './UserContext';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const { data, error } = await supabase.from('favorites').select('*').eq('user_id', user.id);
        if (!error) {
          setFavorites(data.map((favorite) => favorite.episode_id));
        }
      }
    };
    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const episodes = await Promise.all(favorites.map((episodeId) => fetchEpisodeById(episodeId)));
      setFavoriteEpisodes(episodes);
    };
    fetchData();
  }, [favorites]);

  const handleRemoveFavorite = (episodeId) => {
    const updatedFavorites = favorites.filter((id) => id !== episodeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const groupEpisodesByShowAndSeason = () => {
    const groupedEpisodes = {};
    favoriteEpisodes.forEach((episode) => {
      const key = `${episode.showId}-${episode.seasonNumber}`;
      if (!groupedEpisodes[key]) {
        groupedEpisodes[key] = [];
      }
      groupedEpisodes[key].push(episode);
    });
    return groupedEpisodes;
  };

  const sortEpisodesByDateUpdated = useCallback(() => {
    const sortedEpisodes = [...favoriteEpisodes];
    sortedEpisodes.sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime();
      const dateB = new Date(b.lastUpdated).getTime();
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setFavoriteEpisodes(sortedEpisodes);
  }, [favoriteEpisodes, sortOrder]);

  useEffect(() => {
    sortEpisodesByDateUpdated();
  }, [sortEpisodesByDateUpdated]);

  const groupedEpisodes = groupEpisodesByShowAndSeason();

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        <label>
          Sort by Show Title:
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      </div>
      {Object.keys(groupedEpisodes).map((key) => {
        const episodes = groupedEpisodes[key];
        const { showId, showTitle, seasonNumber } = episodes[0];
        return (
          <div key={key}>
            <h2>
              {showTitle} - Season {seasonNumber}
            </h2>
            <ul>
              {episodes.map((episode) => (
                <li key={episode.id}>
                  <Link to={`/show/${showId}/season/${seasonNumber}/episode/${episode.id}`}>{episode.title}</Link>
                  <span>Added on: {new Date(episode.favoriteDate).toLocaleString()}</span>
                  <button onClick={() => handleRemoveFavorite(episode.id)}>Remove from Favorites</button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
