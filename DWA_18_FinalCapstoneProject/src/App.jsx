/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Homepage/Header';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import LandingPage from './Components/Homepage/LandingPage';
import ShowsDetailsPage from './Components/Homepage/ShowsDetailsPage';
import SeasonView from './Components/Seasons/SeasonView';
import EpisodePage from './Components/Seasons/EpisodePage';
import FavoritesPage from './Components/Toggle/FavoritesPage';
import { UserContext } from './Components/Toggle/Contexts';
import AudioPlayer from './Components/Audio/AudioPlayer';
import supabase from './Components/Toggle/Supabase';
import LoginPage from './Components/Homepage/LoginPage';
import LoadingSpinnerSVG from './Components/Toggle/LoadingSpinnerSVG';


export default function App() {
  /*const [user, setUser] = React.useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);*/

  return (
    <UserContext.Provider>
      <Router>
        <div>
          <LoginPage />
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/show/:showId" element={<ShowsDetailsPage />} />
            <Route path="/show/:showId/season/:seasonNumber" element={<SeasonView />} />
            <Route path="/show/:showId/season/:seasonNumber/episode/:episodeId" element={<EpisodePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <AudioPlayer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);