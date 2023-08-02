/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import Header from './Header';
import supabase from '../Toggle/Supabase'; 
import { useAuth } from '../Login/AuthProvider';

const Home = () => {
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
    if (!Array.isArray(array)) {
      return [];
    }
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

  const handleRegister = async (email, password) => {
    try {
      const { user, error } = await signUp(email, password);
      if (error) {
        throw new Error('Error in Creating Account');
      }
      console.log('Registration Successful:', user);
    } catch (error) {
      setError('Error in Creating Account');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { user, error } = await signIn(email, password);
      if (error) {
        throw new Error('Invalid credentials');
      }
      console.log('Login Successful:', user);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 15,
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
      <Header />

      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            handleLogin(email, password);
          }}>
            <label>Email</label>
            <input type="email" name="email" required />
            <label>Password</label>
            <input type="password" name="password" required />
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
          </form>

          <h2>Register</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            handleRegister(email, password);
          }}>
            <label>Email</label>
            <input type="email" name="email" required />
            <label>Password</label>
            <input type="password" name="password" required />
            {error && <p>{error}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      )}

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
  );
};

export default Home;
