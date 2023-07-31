/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisodeById } from '../Homepage/BrowseAllCards';
import supabase from '../Toggle/Supabase';
import { UserContext } from '../Toggle/Contexts';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG';

export default function EpisodePage() {
  const { episodeId } = useParams();
  const [episode, setEpisode] = React.useState(null);
  const [audioRef, setAudioRef] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = React.useState(false); 
  const [loading, setLoading] = React.useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodeData = await fetchEpisodeById(episodeId);
        setEpisode(episodeData);
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

  useEffect(() => {
    if (user) {
      // Function to check if the episode is in user's favorites
      const checkIsFavorite = async () => {
        try {
          const { data } = await supabase
            .from('favorites')
            .select()
            .eq('user_id', user.id)
            .eq('episode_id', episodeId);

          if (data && data.length > 0) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        } catch (error) {
          console.error('Error checking favorite:', error.message);
        }
      };

      checkIsFavorite();
    }
  }, [user, episodeId]);
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

  const handleToggleFavorite = async () => {
    if (user) {
      try {
        // If the episode is already a favorite, remove it from favorites
        if (isFavorite) {
          await supabase.from('favorites').delete().eq('user_id', user.id).eq('episode_id', episodeId);
          setIsFavorite(false);
        } else {
          // If the episode is not a favorite, add it to favorites
          await supabase.from('favorites').insert([{ user_id: user.id, episode_id: episodeId }]);
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error.message);
      }
    } else {
      // Prompt the user to log in before adding to favorites
    }
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
      {user && (
        <button onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      )}
    </div>
  );
}

// Helper function to format timestamp in seconds to MM:SS format
const formatTimestamp = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


