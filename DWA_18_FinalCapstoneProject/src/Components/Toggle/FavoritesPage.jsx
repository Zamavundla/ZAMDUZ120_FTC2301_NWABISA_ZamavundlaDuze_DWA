/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Toggle/Supabase';
import { Auth } from '@supabase/supabase-js';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function FavoritesPage() {
  const { user } = Auth();
  const [likedShows, setLikedShows] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
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
          setLikedShows(data.map((favorite) => favorite.show_id));
          setLoading(false);
        }
      }
    };
    fetchFavorites();
  }, [user, sortOrder]);

  useEffect(() => {
    const fetchData = async () => {
      const episodes = await Promise.all(likedShows.map((showId) => fetchEpisodeById(showId)));
      setFavoriteEpisodes(episodes.flat());
    };
    fetchData();
  }, [likedShows]);

  const fetchEpisodeById = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      return data.episodes.map((episode) => ({ ...episode, showId }));
    } catch (error) {
      console.error(`Error fetching episodes for show ${showId}:`, error);
      return [];
    }
  };

  const handleRemoveFavorite = async (showId) => {
    try {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('show_id', showId);
      setLikedShows((prevLikedShows) => prevLikedShows.filter((id) => id !== showId));
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

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

      {loading ? (
        <LoadingSpinnerSVG />
      ) : (
        favoriteEpisodes.length > 0 ? (
          <div>
            {favoriteEpisodes.map((episode) => (
              <li key={episode.id}>
                <span>Show Title: {episode.showTitle}</span>
                <span>Episode Title: {episode.title}</span>
                <span>Added on: {new Date(episode.favoriteDate).toLocaleString()}</span>
                <button onClick={() => handleRemoveFavorite(episode.showId)}>Remove from Favorites</button>
              </li>
            ))}
          </div>
        ) : (
          <p>No favorites added yet.</p>
        )
      )}
      {/* Additional Navbar */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Link to="/">Navigating Horizons</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/browse-all">Browse All Shows</Link>
        <Link to="/about-us">About Us</Link>
      </div>
    </div>
  );
}
