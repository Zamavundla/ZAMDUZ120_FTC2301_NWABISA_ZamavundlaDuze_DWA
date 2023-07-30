/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchEpisodeById, fetchShowById } from '../Homepage/BrowseAllCards';
import supabase from '../Toggle/Supabase';
import { UserContext } from './Contexts/UserContext';

export default function FavoritesPage () {
  const [favorites, setFavorites] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const { user } = useContext(UserContext); 

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

  const handleRemoveFavorite = (episodeId) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.episode_id !== episodeId);
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

  const groupedEpisodes = groupEpisodesByShowAndSeason();

  const handleShareFavorites = async () => {
    if (user) {
      const publicFavorites = favorites.map((favorite) => ({ episode_id: favorite }));
      try {
        const { data, error } = await supabase.from('public_favorites').upsert(publicFavorites, { returning: 'minimal' });
        if (!error) {
          const shareUrl = `${window.location.origin}/share/${data[0].public_id}`;
          if (navigator.clipboard) {
            try {
              await navigator.clipboard.writeText(shareUrl);
              alert('Share URL copied to clipboard!');
            } catch (error) {
              console.error('Error copying to clipboard:', error.message);
            }
          } else {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = shareUrl;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            alert('Share URL copied to clipboard!');
          }
        }
      } catch (error) {
        console.error('Error sharing favorites:', error.message);
      }
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
