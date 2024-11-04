import React, { useState, useRef, useEffect } from "react";
import './AudioPlayer.css';

function AudioPlayer({ audioSrc,label }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="player-card">
      <img className='audioplayer' src="cover-image.jpg" alt="Description of the cover image" />
      <input className="inputmediaplayer"
      style={ {  accentColor: '#D294BB',width:'100%',backgroundColor:'white'
      }}
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />

      <audio ref={audioRef} src={audioSrc} />
<h2> {label}</h2>
      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      <button className='btnmediaplayer' onClick={handlePlayPause}
      style={
          {width:'6rem',
            color:'white',
            fontSize:'16px',
            fontWeight:'600',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'white',
            backgroundColor:'#D294BB',
            border:'none',
            borderRadius:'10px',
            cursor:'pointer',
            margin:'5px uato 10px auto'
          }
        }
      >
        <span >
          {isPlaying ? "pause" : "play"}
        </span>
      </button>
    </div>
  );
}

export default AudioPlayer;
