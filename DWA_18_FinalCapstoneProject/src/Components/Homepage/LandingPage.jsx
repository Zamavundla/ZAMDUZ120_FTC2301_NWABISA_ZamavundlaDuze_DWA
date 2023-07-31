/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Fuse from 'fuse.js';
import supabase from '../Toggle/Supabase';
import GenresList from '../Seasons/GenresList';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';


export default function LandingPage() {
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [filterText, setFilterText] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] =  React.useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = supabase.auth.user();
      if (user) {
        setUser(user);
      }
    };

    const fetchShowsData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setShows(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getRandomItems = (array, count) => {
      const shuffledArray = shuffleArray(array);
      return shuffledArray.slice(0, count);
    };

    const fetchRecommendedShows = () => {
      const randomRecommendedShows = getRandomItems(shows, 3);
      setRecommendedShows(randomRecommendedShows);
    };

    fetchUserData();
    fetchShowsData();
    fetchRecommendedShows();
  }, [shows]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        setUser(user);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Function to get genre name by its ID
  const getGenreNameById = (genreId) => {
    const genreMap = {
      1: 'Personal Growth',
      2: 'True Crime and Investigative Journalism',
      3: 'History',
      4: 'Comedy',
      5: 'Entertainment',
      6: 'Business',
      7: 'Fiction',
      8: 'News',
      9: 'Kids and Family',
    };
    return genreMap[genreId] || 'Unknown Genre';
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortByDate = (event) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
    ? fuzzySearch(filterText)
    : selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre))
    : shows;

    if (loading) {
      return <LoadingSpinnerSVG />; 
    }
  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h1>Welcome to the Navigating Horizons Podcast App!</h1>
      {user ? ( 
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      <h2>Recommended Shows</h2>
      <div>
        <Slider {...carouselSettings}>
          {recommendedShows.map((show) => (
            <div key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
              <p>{show.title}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
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
        {[
          'Personal Growth',
          'True Crime and Investigative Journalism',
          'History',
          'Comedy',
          'Entertainment',
          'Business',
          'Fiction',
          'News',
          'Kids and Family',
        ].map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>Clear</button>
      </div>
      <ul>
  {filteredShows.map((show) => (
    <li key={show.id}>
      <Link to={`/show/${show.id}`}>
        <img src={show.image} alt={show.title} />
        <span>{show.title}</span>
        <span>{show.seasons} Seasons</span>
        <span>Last Updated: {show.updated}</span>
        <GenresList genreId={show.genres[0]} />
      </Link>
    </li>
  ))}
</ul>    </div>
  </div>
);
}
