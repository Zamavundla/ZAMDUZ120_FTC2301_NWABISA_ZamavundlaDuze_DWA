/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import { UserContext } from '../Toggle/UserContext';
import carouselSettings from './LandingPage'
import supabase from '../Toggle/Supabase';
import { useAuth } from '../Login/AuthProvider';
import Header from './LandingPage';
import BrowseAllCards from './BrowseAllCards';
import Arrow from '../Toggle/Arrow'; // Add this import for the Arrow component

export default function Home() {
  const { user, signOut, signUp, signIn } = useAuth(); // Use your actual authentication context here
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendedShows = async () => {
      try {
        // Fetch the recommended shows from your API (e.g., supabase)
        const { data, error } = await supabase.from('recommendedShows').select('*');
        if (error) {
          throw new Error('Failed to fetch recommended shows');
        }
        // Ensure data is an array before processing
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format for recommended shows');
        }
        // Pick random shows for recommendedShows
        const randomRecommendedShows = getRandomItems(data, 3);
        setRecommendedShows(randomRecommendedShows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended shows:', error);
        setError('Error fetching recommended shows');
        setLoading(false);
      }
    };

    fetchRecommendedShows();
  }, []);

  const getRandomItems = (array, count) => {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.slice(0, count);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header />

      {/* Welcome Message */}
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      )}

      {/* Recommended Shows */}
      <div style={{ flex: '1', maxHeight: '25vh', overflowY: 'auto' }}>
        <h2>Recommended Shows</h2>
        {loading ? (
          <LoadingSpinnerSVG />
        ) : (
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
        )}
      </div>

      {/* Additional Navbar */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/browse-all">Browse All Shows</Link>
        <Link to="/about-us">About Us</Link>
      </div>

      {/* Facts about Maritime Industry */}
      <div style={{ flex: '3', paddingTop: '1rem' }}>
        <h2>Facts about Maritime Industry</h2>
        {/* Add your facts content here */}
      </div>

      {/* Recommended Shows Again */}
      <div style={{ flex: '1', maxHeight: '25vh', overflowY: 'auto' }}>
        <h2>Recommended Shows</h2>
        {loading ? (
          <LoadingSpinnerSVG />
        ) : (
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
        )}
      </div>
    </div>
  );
}