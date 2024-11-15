import React, { useState } from 'react';
import useStore from './useStore'; // Импорт стора
import './audioFiles.css';
import CreatePlaylistModal from './createplaylistmodal';

const AudioFiles = () => {
  const { 
    myMusic, 
    currentTrack, 
    isPlaying, 
    playTrack, 
    pauseTrack, 
    removeFromMyMusic, 
    addToMyMusic, 
    shouldPreventPlay 
  } = useStore();
  
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrackClick = (file, index) => {
    if (shouldPreventPlay) return; // Пропустить, если блокировка активна

    if (currentTrack?.index === index) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack({ ...file, index });
      }
    } else {
      playTrack({ ...file, index });
    }
  };

  const openModal = (e) => {
    e.stopPropagation(); 
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const isTrackInMyMusic = (track) => myMusic.some((t) => t.src === track.src);

  return (
    <div className="main_audio_files_block">
      {myMusic.map((file, index) => (
        <div key={index} className="track-item">
          <button
            style={{
              backgroundColor: hoverIndex === index || (currentTrack?.index === index) ? '#333333' : '#222222'
            }}
            className="play_button"
            onClick={() => handleTrackClick(file, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className='left_side_block'>
              <img
                className="cover__img"
                src={file.cover}
                alt=""
                style={{
                  filter: hoverIndex === index || (currentTrack?.index === index) ? 'brightness(50%)' : 'brightness(100%)'
                }}
              />
              {!isPlaying || (currentTrack?.index === index && (
                <img src="" alt="" className="is_playing_track" />
              ))}
              {hoverIndex === index && (!isPlaying || currentTrack?.index !== index) && (
                <div className="cicle">
                  <img className="icon__play" src="icons8-воспроизведение-24.png" alt="" />
                </div>
              )}
              {hoverIndex === index && isPlaying && currentTrack?.index === index && (
                <div className="cicle2">
                  <img className="icon__play2" src="pause.png" alt="" />
                </div>
              )}
            
              <div className="audio_box">
                <p className="title">{file.title}</p>
                <p className="author">{file.author}</p>
              </div>
            </div>
            <div className="common_left_side_container">
              <div className="add_to_playlist_button" onClick={(e) => openModal(e)}>
                <img src="add-list(1).png" alt="Add to playlist" />
              </div>
              <div
                className="delete-button-container"
                onClick={() => {
                  if (isTrackInMyMusic(file)) {
                    removeFromMyMusic(file);
                  } else {
                    addToMyMusic(file);
                  }
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
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
