/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShows } from '../Components/BrowseAllCards';
import Fuse from 'fuse.js';

export default function LandingPage() {
  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [filterText, setFilterText] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShows();
      setShows(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortShows = (showsToSort) => {
    const sortedShows = [...showsToSort];
    if (sortOrder === 'asc') {
      sortedShows.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedShows.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedShows;
  };

  const handleSortByDate = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortByUpdatedDate = () => {
    const sortedShows = [...shows];
    if (sortOrder === 'asc') {
      sortedShows.sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
      setSortOrder('desc');
    } else {
      sortedShows.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      setSortOrder('asc');
    }
    setShows(sortedShows);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const fuzzySearch = (searchText) => {
    const options = {
      includeScore: true,
      threshold: 0.2,
      keys: ['title'],
    };
    const fuse = new Fuse(shows, options);
    return fuse.search(searchText).map((result) => result.item);
  };

    const handleGenreClick = (genre) => {
      setSelectedGenre(genre);
      setFilterText('');
    };


    const filteredShows = filterText
    ? fuzzySearch(filterText) : selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre)) : shows;


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Available Shows</h1>
      <div>
        <label>
          Sort by Title:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
        <button onClick={handleSortByUpdatedDate}>
          Sort by Date Updated: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div>
        <label>
          Filter by Title:
          <input type="text" value={filterText} onChange={handleFilterChange} />
        </label>
      </div>
      <div>
        Genres:{' '}
        {['Personal Growth', 'True Crime and Investigative Journalism', 'History', 'Comedy', 'Entertainment', 'Business', 'Fiction', 'News', 'Kids and Family'].map(
          (genre) => (
            <button key={genre} onClick={() => handleGenreClick(genre)}>
              {genre}
            </button>
          )
        )}
        <button onClick={() => setSelectedGenre(null)}>Clear</button>
      </div>
      <ul>
        {filteredShows.map((show) => (
          <li key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.previewImageUrl} alt={show.title} />
              <span>{show.title}</span>
              <span>{show.seasons.length} Seasons</span>
              <span>Last Updated: {show.lastUpdated}</span>
              <div>
                Genres:{' '}
                {show.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>  );
}
