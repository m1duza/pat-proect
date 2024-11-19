import React, { useState } from 'react';
import useStore from './useStore'; // Импорт стора
import './audioFiles.css';
import CreatePlaylistModal from './createplaylistmodal';

const AudioFiles = () => {
  const { 
    myMusic, 
    currentTrackIndex,  // Получаем индекс текущего трека из store
    currentTrack, 
    isPlaying, 
    playTrack, 
    pauseTrack, 
    removeFromMyMusic, 
    addToMyMusic ,
    setContext
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  // Обработчик клика по треку


  const handleTrackClick = (file, index) => {
    setContext(myMusic); // Устанавливаем контекст как `myMusic`
  
    if (currentTrack?.src === file.src) {
      isPlaying ? pauseTrack() : playTrack(file, index);
    } else {
      playTrack(file, index);
    }
  };
  
  
  
  const openModal = (e) => {
    e.stopPropagation(); 
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const isTrackInMyMusic = (track) => myMusic.some((t) => t.src === track.src);
  
  // Проверка активного трека
  const isActiveTrack = (index) => currentTrackIndex === index;

  return (
    <div className="main_audio_files_block">
      {myMusic.map((track, index) => (
        <div key={track.src} className="track-item">
          <button
            style={{
              backgroundColor: isActiveTrack(index) || hoverIndex === index ? '#333333' : '#222222', // Используем isActiveTrack для проверки текущего трека
            }}
            
            className="play_button"
            onClick={() => handleTrackClick(track, index)}  // Передаем индекс трека при клике
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className='left_side_block'>
              <img
                className="cover__img"
                src={track.cover}
                alt=""
                style={{
                  filter: isActiveTrack(index) ? 'brightness(50%)' : 'brightness(100%)' // Меняем фильтр в зависимости от активного состояния
                }}
              />
              {isActiveTrack(index) && (
                <div className={isPlaying ? "cicle2" : "cicle"}>
                  <img 
                    className={isPlaying ? "icon__play2" : "icon__play"} 
                    src={isPlaying ? "pause.png" : "icons8-воспроизведение-24.png"} 
                    alt={isPlaying ? "Pause" : "Play"} 
                  />
                </div>
              )}
               {hoverIndex === index && (!isPlaying && currentTrack?.index !== index) && (
                          <div className='cicle'>
                            <img className='icon__play' src="icons8-воспроизведение-24.png" alt="Play" />
                          </div>
                        )}
                        {hoverIndex === index && isPlaying && currentTrack?.index === index && (
                          <div className='cicle2'>
                            <img className='icon__play2' src="pause.png" alt="Pause" />
                          </div>
                        )}
              <div className="audio_box">
                <p className="title">{track.title}</p>
                <p className="author">{track.author}</p>
              </div>
            </div>
            <div className="common_left_side_container">
              <div className="add_to_playlist_button" onClick={(e) => openModal(e)}>
                <img src="add-list(1).png" alt="Add to playlist" />
              </div>
              <div
                className="delete-button-container"
                onClick={() => {
                  if (isTrackInMyMusic(track)) {
                    removeFromMyMusic(track);
                  } else {
                    addToMyMusic(track);
                  }
                }}
              >
                <img src='icons8-умножение-24 (1).png' alt="Delete" className='multiply' />
              </div>
            </div>
          </button>
        </div>
      ))}
     
      {isModalOpen && <CreatePlaylistModal onClose={closeModal} />}
    </div>
  );
};

export default AudioFiles;
