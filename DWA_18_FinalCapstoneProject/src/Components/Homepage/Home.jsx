/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';
import { useAuth } from '../Login/AuthProvider';
import supabase from '../Toggle/Supabase';
import BrowseAllCards from './BrowseAllCards';
import Arrow from '../Toggle/Arrow';

export default function Home() {
  const { user, signOut } = useAuth();
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const fetchRecommendedShows = async () => {
      try {
        // Fetch the recommended shows from the API endpoint
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setRecommendedShows(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended shows:', error);
        setError('Error fetching recommended shows');
        setLoading(false);
      }
    };

    fetchRecommendedShows();
  }, []);

  useEffect(() => {
    // Set the total number of slides in the Slider component
    setTotalSlides(recommendedShows.length);
  }, [recommendedShows]);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 30000, // 30 seconds per slide
    prevArrow: <Arrow direction="prev" onClick={() => sliderRef.current.slickPrev()} />,
    nextArrow: <Arrow direction="next" onClick={() => sliderRef.current.slickNext()} />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="home" style={{ display: 'flex', flexDirection: 'column' }}>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      )}

      {/* Recommended Shows Carousel */}
      <div style={{ maxHeight: '25vh', overflowY: 'hidden' }}>
        <h2>Recommended Shows</h2>
        {loading ? (
          <LoadingSpinnerSVG />
        ) : (
          <Slider ref={sliderRef} {...settings}>
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
        <p>
          {currentSlide + 1} of {totalSlides}
        </p>
      </div>

      {/* Additional Navbar */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Link to="/">Navigating Horizons</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/browse-all">Browse All Shows</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div style={{ flex: '3', paddingTop: '1rem' }}>
        <h2>Facts about Oceans</h2>
        <ul>
        <li>The Horizon Illusion: The horizon appears flat, but it's actually slightly curved due to the Earth's round shape.</li>
        <li>The Deepest Point: The Challenger Deep in the Mariana Trench is the deepest known point in the ocean, reaching a depth of about 36,070 feet (10,994 meters).</li>
        <li>Vast Ocean Area: Oceans cover approximately 71% of the Earth's surface, making them the largest ecosystems on the planet.</li>
        <li>The Great Barrier Reef: The Great Barrier Reef in Australia is the world's largest coral reef system, stretching over 2,300 kilometers.</li>
        <li>The Blue Whale: The blue whale is the largest animal on Earth and can grow up to 100 feet in length and weigh over 200 tons.</li>
        <li>Ocean Currents: Ocean currents play a vital role in regulating the Earth's climate, redistributing heat around the globe.</li>
        <li>Ocean Pollution: Approximately 8 million tons of plastic waste end up in the ocean each year, causing significant harm to marine life.</li>
        <li>Shipping Industry: The maritime industry is responsible for transporting around 90% of the world's goods.</li>
        <li>Titanic Tragedy: The RMS Titanic, a famous passenger liner, sank in 1912 after hitting an iceberg on its maiden voyage.</li>
        <li>Bioluminescence: Many marine organisms, such as certain species of plankton and fish, have the ability to produce light through a process called bioluminescence.</li>
        <li>Ocean Exploration: The ocean remains largely unexplored, with more than 80% of it still unmapped and unexplored by humans.</li>
        <li>Seamounts: Seamounts are underwater mountains rising from the ocean floor. They are hotspots of biodiversity and play a crucial role in marine ecosystems.</li>
        <li>Ocean Acidification: Increased carbon dioxide emissions lead to ocean acidification, which negatively impacts coral reefs and marine life with calcium carbonate shells.</li>
        <li>Ocean Currents: The Gulf Stream is a powerful ocean current that carries warm water from the Gulf of Mexico across the Atlantic Ocean, influencing weather patterns.</li>
        <li>Marine Biodiversity: Oceans are home to a diverse range of life forms, including an estimated 2 million species, many of which are yet to be discovered and studied.</li>
      </ul>     
     </div>
     </div>
  );
}
