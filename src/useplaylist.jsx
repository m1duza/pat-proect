import { useState, useRef } from 'react';

function usePlaylist() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);

  const addAudioRef = (index, ref) => {
    if (ref && audioRefs.current[index] !== ref) {
      audioRefs.current[index] = ref;
      console.log(`Added audio ref for index ${index}`, ref);
    }
  };
  
  const togglePlay = (index) => {
    if (!audioRefs.current[index]) {
      console.warn(`Audio reference at index ${index} is not initialized.`);
      return;
    }
  
    const currentAudio = audioRefs.current[index];
  
    if (isPlaying && currentTrack?.index === index) {
      currentAudio.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack && audioRefs.current[currentTrack.index]) {
        audioRefs.current[currentTrack.index].pause();
        audioRefs.current[currentTrack.index].currentTime = 0;
      }
      currentAudio.play();
      setCurrentTrack({
        index,
        ...audioRefs.current[index].dataset, // или источник данных трека
      });
      setIsPlaying(true);
    }
    console.log("Current track in hook:", currentTrack);

  };
  

  return {
    currentTrack,
    isPlaying,
    togglePlay,
    addAudioRef,
    setCurrentTrack,
    audioRefs,
    setIsPlaying
  };
}

export default usePlaylist;