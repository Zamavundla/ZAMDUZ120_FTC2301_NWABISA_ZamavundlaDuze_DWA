/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/Homepage/LandingPage';
import ShowDetailsPage from './Components/Homepage/ShowsDetailsPage';
import SeasonView from './Components/Seasons/SeasonView';
import EpisodePage from './Components/Seasons/EpisodePage';
import FavoritesPage from './Components/Toggle/FavoritesPage';
import AudioPlayer from './Components/Audio/AudioPlayer';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/show/:showId" component={ShowDetailsPage} />
          <Route exact path="/show/:showId/season/:seasonNumber" component={SeasonView} />
          <Route exact path="/show/:showId/season/:seasonNumber/episode/:episodeId" component={EpisodePage} />
          <Route exact path="/favorites" component={FavoritesPage} />
        </Switch>
        <AudioPlayer />
      </div>
    </Router>
  );
};

export default App;
