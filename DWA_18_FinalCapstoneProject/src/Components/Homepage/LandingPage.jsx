/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthProvider';
import Contact_Us from './ContactUs';
import About_Us from './About Us';
import ocean1 from 'C:/Users/suppo/OneDrive/Documents/CodeSpace Academy Challenges/Dynamic Web Applications/ZAMDUZ120_FTC2301_NWABISA_ZamavundlaDuze_DWA/DWA_18_FinalCapstoneProject/src/assets/ocean.jpg';
import ocean2 from 'C:/Users/suppo/OneDrive/Documents/CodeSpace Academy Challenges/Dynamic Web Applications/ZAMDUZ120_FTC2301_NWABISA_ZamavundlaDuze_DWA/DWA_18_FinalCapstoneProject/src/assets/ocean2.jpg';
import oceanVideo from 'C:/Users/suppo/OneDrive/Documents/CodeSpace Academy Challenges/Dynamic Web Applications/ZAMDUZ120_FTC2301_NWABISA_ZamavundlaDuze_DWA/DWA_18_FinalCapstoneProject/src/assets/sea.mp4';

const imageSequence = [ocean1, ocean2, oceanVideo];
const imageInterval = 10000; // 10 seconds

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to update the current index
    const updateIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex === imageSequence.length - 1 ? 0 : prevIndex + 1));
    };

    // Start the loop
    const loop = setTimeout(updateIndex, imageInterval);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(loop);
  }, [currentIndex]);

  const currentImage = imageSequence[currentIndex];
  
  return (
    <div>
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Navigating Horizons Podcast App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={About_Us}>
                    About Us
                  </Link>
                </li>
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={Contact_Us}>
                        Contact Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={signOut}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={useAuth}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={useAuth}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

 {/* Body */}
 <div className="container my-5">
        <h1 className="display-2 text-center mb-4">Welcome to Navigating Horizons Podcast App</h1>
        {typeof currentImage === 'string' ? (
          <img
            src={currentImage}
            alt="Ocean Waves"
            className="img-fluid rounded"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex === imageSequence.length - 1 ? 0 : prevIndex + 1))}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <video src={currentImage} controls className="img-fluid rounded mt-4" />
        )}
        <div className="d-grid gap-3 col-md-6 mx-auto mt-4">
          {user ? (
            <Link to="/form" className="btn btn-primary">
              Go to Form
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </>
          )}        </div>
      </div>
    </div>
  );
}