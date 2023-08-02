/* The code you provided is a JavaScript React code that sets up the main structure of a React
application. Here's a breakdown of what it does: */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserContext } from './Components/Toggle/UserContext'; 
import Header from './Components/Homepage/Header';
import Home from './Components/Homepage/Home';
import LandingPage from './Components/Homepage/LandingPage';
import ShowsDetailsPage from './Components/Homepage/ShowsDetailsPage';
import SeasonView from './Components/Seasons/SeasonView';
import EpisodePage from './Components/Seasons/EpisodePage'; 
import FavoritesPage from './Components/Toggle/FavoritesPage';
import AudioPlayer from './Components/Audio/AudioPlayer';
import Login from './Components/Login/Login';
import { useAuth } from './Components/Login/AuthProvider';
import LoadingSpinnerSVG from './Components/Toggle/LoadingSpinnerSVG';

export default function App() {
  const { user } = useAuth(); 
  return (
    <UserContext.Provider value={user}>
      <Router>
        <div>
          {user ? (
            <Header />
          ) : (
            <Container>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </Container>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:showId" element={<ShowsDetailsPage />} />
            <Route path="/show/:showId/season/:seasonNumber" element={<SeasonView />} />
            <Route path="/show/:showId/season/:seasonNumber/episode/:episodeId" element={<EpisodePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          {user && <AudioPlayer />} 
        </div>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

