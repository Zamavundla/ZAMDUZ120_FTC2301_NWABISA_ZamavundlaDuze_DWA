/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header () {
  return (
    <header>
      <div>
        <Link to="/LandingPage">Navigating Horizons Podcast App</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/recommended">Recommended</Link>
          </li>
          <li>
            <Link to="/genres">Genres</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}