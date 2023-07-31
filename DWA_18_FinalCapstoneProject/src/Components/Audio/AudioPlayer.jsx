/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinnerSVG from '../Toggle/LoadingSpinnerSVG'; 

export default function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const audioRef = useRef(null);
  const progressKey = `progress_${audioSrc}`;
  const storedProgress = localStorage.getItem(progressKey);
  const initialProgress = storedProgress ? parseFloat(storedProgress) : 0;
  const [progress, setProgress] = React.useState(initialProgress);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    audioRef.current.currentTime = progress;
  }, [progress]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  const formatTimestamp = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleAudioEnded = () => {
      setProgress(0);
      localStorage.removeItem(progressKey);
    };

    const currentAudioRef = audioRef.current;
    currentAudioRef.addEventListener('ended', handleAudioEnded);

    return () => {
      currentAudioRef.removeEventListener('ended', handleAudioEnded);
      localStorage.setItem(progressKey, String(currentAudioRef.currentTime));
    };
  }, [progressKey]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  if (!audioRef.current || isNaN(audioRef.current.duration) || audioRef.current.duration <= 0) {
      return <LoadingSpinnerSVG />;
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioSrc}
        controls={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div>
        <button onClick={() => setIsPlaying((prevIsPlaying) => !prevIsPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min={0}
          max={Math.floor(audioRef.current?.duration || 0)}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{formatTimestamp(currentTime)}</span> /{' '}
        <span>{formatTimestamp(audioRef.current?.duration || 0)}</span>
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};
