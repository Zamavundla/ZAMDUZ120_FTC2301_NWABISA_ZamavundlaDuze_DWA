/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../Components/BrowseAllCards'; 
import SeasonSelector from '../Components/SeasonSelector';
import SeasonView from '../Components/SeasonView';
import AudioSelector from '../Components/AudioPlayer'; 

export default function ShowDetailsPage() {
  const { showId } = useParams();
  const [show, setShow] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShowById(showId);
      setShow(data);
      setLoading(false);
    };
    fetchData();
  }, [showId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  return (
    <div>
      <h2>{show.title}</h2>
      <p>Description: {show.description}</p>
      <p>Seasons: {show.seasons}</p>
      <img src={show.image} alt={show.title} style={{ maxWidth: '200px' }} />
      <p>Last Updated: {show.lastUpdated}</p>
      <p>Genres: {show.genres.join(', ')}</p>
      <p>Updated: {show.updated}</p>
      <hr />

      <AudioSelector shows={[show]} /> 

      <h2>Seasons</h2>
      {show.seasons.map((season, index) => (
        <div key={index}>
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
  );
}
