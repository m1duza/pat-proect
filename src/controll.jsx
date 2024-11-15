import React, { useState, useEffect, useRef } from 'react';
import useStore from './useStore';
import './controll.css';

const Controll = () => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    prevTrack,
    nextTrack,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,

    
  } = useStore();

  const [volume, setLocalVolume] = useState(1);
  const timeSliderRef = useRef(null);



  useEffect(() => {
    if (timeSliderRef.current) {
      timeSliderRef.current.value = currentTime;
    }
  }, [currentTime]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    setVolume(newVolume);
  };

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
  };

  return (
    <div className="controll-panel">
      <div className="main__controll__block">
        <div className="left_side__main__block">
          <div className="main_side_major_left_block">
       
            <img
              className="cover__img2"
              src={currentTrack ? currentTrack.cover : "placeholder-cover.png"} 
              alt="Обложка"
            />
            <div className="main__block2">
              <h2 className="title2">
                {currentTrack ? currentTrack.title : "Название трека"} 
              </h2>
              <h3 className="author2">
                {currentTrack ? currentTrack.author : "Автор трека"} 
              </h3>
            </div>
          </div>

          <div className="centrall__controll__block">
            <button className="prev__icon" onClick={prevTrack} disabled={!currentTrack}>
              <img src="icons8-next-30.png" alt="Prev" />
            </button>
            <button
              className="toggle__button"
              onClick={isPlaying ? pauseTrack : () => currentTrack && playTrack(currentTrack)}
            >
              <img
                src={isPlaying ? "pause (1).png" : "icons8-воспроизведение-24.png"}
                alt="Play/Pause"
                className="img_pouse"
              />
            </button>
            <button className="next__icon" onClick={nextTrack} disabled={!currentTrack}>
              <img src="icons8-next-30.png" alt="Next" />
            </button>
          </div>

          <div className="volume__block">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume_slider"
              disabled={!currentTrack}
            />
          </div>
        </div>

        <div className="time__block">
          <input
            type="range"
            ref={timeSliderRef}
            id="time-control"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTrack ? currentTime : 0}
            onChange={handleSliderChange}
            className="time_slider"
            disabled={!currentTrack}
          />
          <span className="time-display">
            {currentTrack
              ? `${Math.floor(currentTime / 60)}:${("0" + Math.floor(currentTime % 60)).slice(-2)}`
              : "0:00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Controll;
