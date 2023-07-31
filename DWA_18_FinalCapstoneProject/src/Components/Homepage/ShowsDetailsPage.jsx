/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SeasonSelector from '../Seasons/SeasonSelector';
import SeasonView from '../Seasons/SeasonView';
import AudioSelector from '../Audio/AudioPlayer';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function ShowsDetailsPage() {
  const { showId } = useParams();
  const [show, setShow] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        const data = await response.json();
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching show ${showId}:`, error);
        setLoading(false);
      }
    };
    fetchData();
  }, [showId]);

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinnerSVG />
      ) : (
        <div>
          <h2>{show.title}</h2>
          <p>Description: {show.description}</p>
          <p>Seasons: {show.seasons.length}</p>
          <img src={show.image} alt={show.title} style={{ maxWidth: '200px' }} />
          <p>Last Updated: {show.updated}</p>
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Updated: {show.updated}</p>
          <hr />

          <AudioSelector shows={[show]} />

          <h2>Seasons</h2>
          {show.seasons.map((season) => (
            <div key={season.number}>
              <p>Season Number: {season.number}</p>
            </div>
          ))}

          <h2>Select a Season</h2>
          <SeasonSelector seasons={show.seasons} onSelectSeason={handleSelectSeason} />

          {selectedSeason && (
            <div>
              <img src={show.seasons[selectedSeason - 1].previewImageUrl} alt={`Season ${selectedSeason}`} />
              <h3>Season {selectedSeason}</h3>
              <p>Episodes: {show.seasons[selectedSeason - 1].episodes.length}</p>
              <SeasonView episodes={show.seasons[selectedSeason - 1].episodes} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
