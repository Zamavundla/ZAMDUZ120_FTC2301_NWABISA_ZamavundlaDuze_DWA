/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import Header from './Components/Homepage/Header'
import LandingPage from './Components/Homepage/LandingPage';
import ShowsDetailsPage from './Components/Homepage/ShowsDetailsPage';
import SeasonView from './Components/Seasons/SeasonView';
import EpisodePage from './Components/Seasons/EpisodePage';
import FavoritesPage from './Components/Toggle/FavoritesPage'
import { UserContext } from './Components/Toggle/Contexts'
import AudioPlayer from './Components/Audio/AudioPlayer';
import supabase from './Components/Toggle/Supabase'

export default function App () {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/show/:showId" component={ShowsDetailsPage} />
            <Route exact path="/show/:showId/season/:seasonNumber" component={SeasonView} />
            <Route exact path="/show/:showId/season/:seasonNumber/episode/:episodeId" component={EpisodePage} />
            <Route exact path="/favorites" component={FavoritesPage} />
          </Switch>
          <AudioPlayer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}
