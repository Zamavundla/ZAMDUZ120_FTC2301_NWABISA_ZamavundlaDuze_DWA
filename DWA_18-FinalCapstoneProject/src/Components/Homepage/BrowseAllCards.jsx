/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GenresList from '../Seasons/GenresList';
import AudioSelector from '../Audio/AudioSelector';
import SeasonSelector from '../Seasons/SeasonSelector';
import SeasonView from '../Seasons/SeasonView';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import Fuse from 'fuse.js';
import Show from '../Seasons/Show'; 

const thumbsStyle = {
  marginRight: '1rem',
  cursor: 'pointer',
};

const BrowseAllCards = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowEpisodes, setSelectedShowEpisodes] = useState({});
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [likedShows, setLikedShows] = useState([]);
  const [filterByGenre, setFilterByGenre] = useState('');
  const [sortByUpdated, setSortByUpdated] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnlineData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setPreviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching online data:', error);
        setLoading(false);
      }
    };

    // Fetch online data
    fetchOnlineData();
  }, []);

  useEffect(() => {
    const fetchLikedShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/favorites');
        const data = await response.json();
        setLikedShows(data);
      } catch (error) {
        console.error('Error fetching liked shows:', error);
      }
    };

    fetchLikedShows();
  }, []);

  const fetchShowAndEpisodes = async (showId) => {
    try {
      // eslint-disable-next-line no-undef
      const showResponse = await     fetch(`https://podcast-api.netlify.app/id/${id}`);
      const showData = await showResponse.json();
      return showData;
    } catch (error) {
      console.error('Error fetching show details:', error);
      return null;
    }
  };

  const handleShowDetails = async (showId) => {
    if (!selectedShowEpisodes[showId]) {
      const showData = await fetchShowAndEpisodes(showId);
      if (showData) {
        setSelectedShowEpisodes((prevEpisodes) => ({
          ...prevEpisodes,
          [showId]: showData,
        }));
      }
    }
    setSelectedShowId(showId);
  };

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const handleAddToFavoritesFromBrowseAll = async (showId, isLiked) => {
    console.log(`Show ${showId} was ${isLiked ? 'liked' : 'disliked'}.`);
    if (isLiked) {
      setLikedShows([...likedShows, showId]);
    } else {
      setLikedShows(likedShows.filter((id) => id !== showId));
    }
  };

  const handleSortByUpdated = (event) => {
    setSortByUpdated(event.target.value);
  };

  const genres = [
    { id: 1, title: 'Personal Growth' },
    { id: 2, title: 'True Crime and Investigative Journalism' },
    { id: 3, title: 'History' },
    { id: 4, title: 'Comedy' },
    { id: 5, title: 'Entertainment' },
    { id: 6, title: 'Business' },
    { id: 7, title: 'Fiction' },
    { id: 8, title: 'News' },
    { id: 9, title: 'Kids and Family' },
  ];

  const handleFilterByGenre = (event) => {
    setFilterByGenre(event.target.value);
  };

  let filteredPreviews = previews;

  if (filterByGenre !== '') {
    filteredPreviews = filteredPreviews.filter((preview) =>
      preview.genres.includes(Number(filterByGenre))
    );
  }

  if (searchTerm) {
    const fuse = new Fuse(filteredPreviews, { keys: ['title', 'description'] });
    filteredPreviews = fuse.search(searchTerm).map((result) => result.item);
  }

  if (sortByUpdated === 'asc') {
    filteredPreviews = [...filteredPreviews].sort((a, b) =>
      a.updated.localeCompare(b.updated)
    );
  } else if (sortByUpdated === 'desc') {
    filteredPreviews = [...filteredPreviews].sort((a, b) =>
      b.updated.localeCompare(a.updated)
    );
  }

  return (
    <div>
      <h1>
        All Podcast Shows:
        <nav>
          <button onClick={() => navigate('/home')} style={{ fontSize: '12px' }}>
            Go Back
          </button>
        </nav>
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <label htmlFor="genreDropdown">Filter by Genre:</label>
        <select
          id="genreDropdown"
          onChange={handleFilterByGenre}
          value={filterByGenre}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.title}
            </option>
          ))}
        </select>
        <label htmlFor="sortDropdown">Sort by Updated:</label>
        <select
          id="sortDropdown"
          onChange={handleSortByUpdated}
          value={sortByUpdated}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">All</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
      </div>
      {loading ? (
        <LoadingSpinnerSVG />
      ) : (
        filteredPreviews.map((preview) => (
          <div key={preview.id}>
            <h2>{preview.title}</h2>
            <p>Description: {preview.description.slice(0, 200) + '...'}</p>
            <img src={preview.image} alt={preview.title} style={{ maxWidth: '200px' }} />
            <GenresList genreIds={preview.genres} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={thumbsStyle}
                role="img"
                aria-label="Thumbs Up"
                onClick={() => handleAddToFavoritesFromBrowseAll(preview.id, true)}
              >
                👍
              </span>
              <span
                style={thumbsStyle}
                role="img"
                aria-label="Thumbs Down"
                onClick={() => handleAddToFavoritesFromBrowseAll(preview.id, false)}
              >
                👎
              </span>
              <div>
                <p style={{ marginRight: '1rem' }}>
                  Updated: {new Date(preview.updated).toLocaleDateString()}
                </p>
                <button onClick={() => handleShowDetails(preview.id)}>Show Details</button>
              </div>
              <AudioSelector
                audioSrc={preview.audio}
                episodeTitle={preview.title}
                showTitle={preview.title}
              />
            </div>
            <hr />
            {selectedShowId === preview.id && (
              <div>
                <p>Seasons: {preview.seasons}</p>
                <img src={preview.image} alt={preview.title} />
                <p>{preview.description}</p>
                <SeasonSelector seasons={preview.seasons} onSelectSeason={handleSelectSeason} />
                <h3>Episodes for Season {selectedSeason}:</h3>
                <SeasonView
                  episodes={selectedShowEpisodes[preview.id]?.episodes.filter(
                    (episode) => episode.seasonNumber === selectedSeason
                  )}
                  selectedSeason={selectedSeason}
                />
                <button onClick={() => handleShowDetails(null)}>Show Less</button>
                <Link to={`/episode/${preview.id}`} style={{ marginLeft: '0.5rem' }}>
                  <button>Show More</button>
                </Link>
                {/* Integrate the Show component */}
                {selectedShowId === preview.id && (
                  <Show show={selectedShowEpisodes[preview.id]} onClose={() => handleShowDetails(null)} />
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseAllCards;
