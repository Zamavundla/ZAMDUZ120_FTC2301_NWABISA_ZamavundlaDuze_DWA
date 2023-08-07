/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react'; // Import Auth component
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function Home() {
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const shuffledRecommendedShows = recommendedShows.sort(() => Math.random() - 0.5);
  
  // Use the Auth component to get the user
  const user = Auth.useUser();


return (
    <div className="home" style={{ display: 'flex', flexDirection: 'column' }}>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => Auth.signOut()}>Logout</button>
        </div>
      )}

      {/* Recommended Shows Carousel */}
      <div style={{ maxHeight: '550vh', overflowY: 'hidden' }}>      <div style={{ maxHeight: '550vh', overflowY: 'hidden' }}>
        <h2>Recommended Shows</h2>
        {loading ? (
          <LoadingSpinnerSVG />
        ) : (
          <Carousel
            showArrows
            showStatus={false} // Hide the status/bullets
            showThumbs={false} // Hide the thumbs/bullets
            infiniteLoop
            autoPlay
            interval={5000} // 5 seconds interval
            renderIndicator={() => null} // Render an empty element to hide the indicators completely
          >
            {shuffledRecommendedShows.map((show) => (
              <div key={show.id}>
                <Link to={`/show/${show.id}`}>
                  <img
                    src={show.image}
                    alt={show.title}
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </Link>
                <p>{show.title}</p>
              </div>
            ))}
          </Carousel>
        )}
      </div>

  {/* Additional Navbar */}
  <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Link to="/">Navigating Horizons</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/browse-all">Browse All Shows</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div style={{ flex: '3', paddingTop: '1rem' }}>        <ul>
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
     </div>
  );
}

