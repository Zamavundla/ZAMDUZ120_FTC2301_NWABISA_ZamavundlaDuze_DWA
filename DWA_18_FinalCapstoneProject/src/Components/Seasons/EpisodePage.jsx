/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function EpisodePage() {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${episodeId}`);
        const data = await response.json();
        setEpisode(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episode data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [episodeId]);

  useEffect(() => {
    if (audioRef) {
      isPlaying ? audioRef.play() : audioRef.pause();
    }
  }, [isPlaying, audioRef]);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.currentTime);
  };

  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    setCurrentTime(seekTime);
    audioRef.currentTime = seekTime;
  };

  if (loading) {
    return <LoadingSpinnerSVG />;
  }

  return (
    <div>
      <h1>
        {episode.showTitle} - Season {episode.seasonNumber} - Episode {episode.episodeNumber}
      </h1>
      <h2>{episode.title}</h2>
      <p>{episode.description}</p>
      <audio
        ref={(element) => setAudioRef(element)}
        src={episode.updated}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input type="range" min={0} max={episode.duration} step={0.1} value={currentTime} onChange={handleSeek} />
        <span>{formatTimestamp(currentTime)}</span> / <span>{formatTimestamp(episode.duration)}</span>
      </div>
    </div>
  );
}

// Helper function to format timestamp in seconds to MM:SS format
const formatTimestamp = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
