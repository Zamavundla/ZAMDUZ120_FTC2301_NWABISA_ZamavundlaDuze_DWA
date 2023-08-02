/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import supabase from '../Toggle/Supabase';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import { useAuth } from '../Login/AuthProvider';
import Register from '../Login/Register';
import Arrow from '../Toggle/Arrow';
import Header from './Header';

const LandingPage = () => {
  const { user, login } = useAuth();
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false); // Added dataFetched state

  useEffect(() => {
    const fetchRecommendedShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const randomRecommendedShows = getRandomItems(data, 3);
        setRecommendedShows(randomRecommendedShows);
        setLoading(false);
        setDataFetched(true); // Update dataFetched state after successful data fetch
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rtl: true,
    // Add prevArrow and nextArrow settings
    prevArrow: <Arrow direction="prev" />,
    nextArrow: <Arrow direction="next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on screens smaller than 768px
        },
      },
    ],
  };

  return (
    <div>
      <Header />

      {!user ? (
        <div>
          <h2>Login</h2>
          <Register /> {/* Use the Register component here for user registration */}
        </div>
      ) : (
        <div className="slider-container"> {/* Add the "slider-container" class */}
          <h2>Recommended Shows</h2>
          {loading ? (
            <LoadingSpinnerSVG />
          ) : dataFetched ? ( // Display the recommended shows only if data is fetched
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
          ) : (
            <p>Failed to fetch recommended shows.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
