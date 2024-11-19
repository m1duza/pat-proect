import { useState, useEffect, useRef } from 'react';
import './playlist.css';
import usePlaylistData from './usePlaylistData';
import useStore from './useStore';
import Playlist2 from './playlist2.jsx';
import { useNavigate } from "react-router-dom";



export default function Playlistwrapper() {
    const playlistData = usePlaylistData('/pat-proect/rockPlaylist.json'); // Данные из rockPlaylist.json
  const {
    myMusic,
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    setPlaylist,
    addToMyMusic,
    removeFromMyMusic,
    setContext,
    currentTrackIndex
    
  } = useStore();
  const [togglePlayList, setTogglePlayList] = useState(false);
  const [toggleOpenPlayList, setToggleOpenPlayList] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setPlaylist(playlistData);
  }, [playlistData, setPlaylist]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setToggleOpenPlayList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTrackClick = (file, index) => {
    setContext(playlistData.tracks); // Устанавливаем контекст плейлиста

    if (currentTrack?.src === file.src) {
      isPlaying ? pauseTrack() : playTrack(file, index);
    } else {
      playTrack(file, index);
    }
  };
  
 
  const isActiveTrack = (index) => currentTrackIndex === index;
  const isTrackInMyMusic = (track) => myMusic.some((t) => t.src === track.src);

return(
        <div className="main_playlist_block">
            <div
            className="container_for_playlist"
            onMouseEnter={() => setTogglePlayList(true)}
            onMouseLeave={() => setTogglePlayList(false)}
            onClick={() => setToggleOpenPlayList(true)}
            >
            <div className="main_playlist">
                <img
                className="playlist_wrapper"
                src="/pat-proect/rockcover2 1.png"
                alt="Playlist cover"
                style={{
                    filter: togglePlayList ? 'brightness(50%)' : 'brightness(100%)'
                }}
                />

                {togglePlayList && (
                <div className="pop_up">
                    <img className="pop_up_icon" src="icons8-воспроизведение-30.png" alt="Play Icon" />
                </div>
                )}

                <p className="main_playlist_title">Rock top 100</p>
                <p className="main_playlist_author">Author</p>

                {toggleOpenPlayList && (
                <div className="black_background">
                    <div ref={wrapperRef} className="main_playlist_wrapper">
                    <div className="main_audio_files_block2">
                    <div className="upper_block2">
                      <img
                        className="playlist_wrapper5"
                        src="/pat-proect/rockcover2 1.png"
                        alt="Playlist cover"
                      />
                  
                  </div>
                  <div className="bottom_audio_files_block">
                        {playlistData.tracks.map((file, index) => (
                        <div key={index} className="track">
                            <button
                             style={{
                              backgroundColor: isActiveTrack(index) || hoverIndex === index ? '#333333' : '#222222', // Используем isActiveTrack для проверки текущего трека
                            }}
                            className="play_button2"
                            onClick={() => handleTrackClick(file, index)}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            >
                            <div className="main_left_side_block">
                            <img className="cover__img" src={file.cover} alt={file.title}
                              style={{
                                filter: isActiveTrack(index) ? 'brightness(50%)' : 'brightness(100%)' // Меняем фильтр в зависимости от активного состояния
                              }}
                            />
                      
                            {hoverIndex === index && (!isPlaying || currentTrack?.index !== index) && (
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
                                <p className="title">{file.title}</p>
                                <p className="author">{file.author}</p>
                            </div>
                            </div>
                            <div className="track-actions">
                            {hoverIndex === index && <img
                                src={isTrackInMyMusic(file) ? 'icons8-умножение-24 (1).png' : 'icons8-plus-math-24.png'} // Условие для иконок
                                
                                onClick={() => {
                                    isTrackInMyMusic(file) ? removeFromMyMusic(file) : addToMyMusic(file);
                                }}
                                style={{ cursor: 'pointer' }} // Для указателя на изображение
                            />
                                }

                            </div>
                            </button>

                        </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                )}
    
            </div>

            </div>
                <Playlist2 />
            </div>
    )
}
