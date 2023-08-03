/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Toggle/Supabase';
import { useAuth } from '../Login/AuthProvider';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        let { data, error } = await supabase.from('favorites').select('*').eq('user_id', user.id);
        if (!error) {
          data = data.map((favorite) => ({ ...favorite, favoriteDate: new Date(favorite.created_at) }));
          if (sortOrder === 'asc') {
            data.sort((a, b) => a.showTitle.localeCompare(b.showTitle));
          } else if (sortOrder === 'desc') {
            data.sort((a, b) => b.showTitle.localeCompare(a.showTitle));
          }
          setFavorites(data);
          setLoading(false);
        }
      }
    };
    fetchFavorites();
  }, [user, sortOrder]);

  useEffect(() => {
    const fetchData = async () => {
      const episodes = await Promise.all(favorites.map((favorite) => fetchEpisodeById(favorite.episode_id)));
      setFavoriteEpisodes(episodes);
    };
    fetchData();
  }, [favorites]);

  const fetchEpisodeById = async (episodeId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${episodeId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching episode ${episodeId}:`, error);
      return null;
    }
  };

  const handleRemoveFavorite = async (episodeId) => {
    try {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('episode_id', episodeId);
      const updatedFavorites = favorites.filter((favorite) => favorite.episode_id !== episodeId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
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



  const groupedEpisodes = groupEpisodesByShowAndSeason();

  const handleShareFavorites = async () => {
    // Your share favorites logic here
  };

  if (loading) {
    return <LoadingSpinnerSVG />;
  }

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

      <div>
        {favorites.map((favorite) => (
          <li key={favorite.episode_id}>
            <span>Added on: {favorite.favoriteDate.toLocaleString()}</span>
          </li>
        ))}
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
