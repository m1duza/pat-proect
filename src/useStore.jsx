import { create } from 'zustand';

const useStore = create((set, get) => {
  const audio = new Audio();

  const initialMyMusic = JSON.parse(localStorage.getItem('myMusic')) || [];
  const initialPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];

  audio.addEventListener('loadedmetadata', () => {
    set({ duration: audio.duration });
  });

  audio.addEventListener('timeupdate', () => {
    set({ currentTime: audio.currentTime });
  });

  return {
    myMusic: initialMyMusic,
    playlists: initialPlaylists,
    currentTrack: null,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    shouldPreventPlay: false, // Флаг для блокировки воспроизведения
    

    enableAutoPlay: () => set({ autoPlayEnabled: true }),
    disableAutoPlay: () => set({ autoPlayEnabled: false }),

    addToMyMusic: (track) => {
      set({ shouldPreventPlay: true });
      const myMusic = get().myMusic;
      const isAlreadyAdded = myMusic.some((t) => t.src === track.src);

      if (!isAlreadyAdded) {
        const updatedMyMusic = [...myMusic, track];
        set({ myMusic: updatedMyMusic });
        localStorage.setItem('myMusic', JSON.stringify(updatedMyMusic));
      }

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    removeFromMyMusic: (track) => {
      set({ shouldPreventPlay: true });

      const updatedMyMusic = get().myMusic.filter((t) => t.src !== track.src);
      set({ myMusic: updatedMyMusic });
      localStorage.setItem('myMusic', JSON.stringify(updatedMyMusic));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    playTrack: (track) => {
      if (get().shouldPreventPlay) return;

      get().disableAutoPlay();
      if (get().currentTrack?.src !== track.src) {
        audio.src = track.src;
        set({ currentTrack: track });
      }
      audio.play();
      set({ isPlaying: true });
    },

    pauseTrack: () => {
      audio.pause();
      set({ isPlaying: false });
    },

    setCurrentTime: (time) => {
      audio.currentTime = time;
      set({ currentTime: time });
    },

    setVolume: (volume) => {
      audio.volume = volume;
      set({ volume });
    },

    setPlaylist: (playlist) => set({ playlist }),

    createPlaylist: ({ name, description, cover }) => {
      set({ shouldPreventPlay: true });

      if (!name || !description) {
        console.error("Playlist name and description are required.");
        set({ shouldPreventPlay: false });
        return;
      }

      const newPlaylist = {
        id: Date.now(),
        name,
        description,
        cover: cover || "",
        tracks: [],
      };

      const updatedPlaylists = [...get().playlists, newPlaylist];
      set({ playlists: updatedPlaylists });
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    // Функция для удаления плейлиста по его ID
    removePlaylist: (playlistId) => {
      set({ shouldPreventPlay: true });

      const updatedPlaylists = get().playlists.filter((playlist) => playlist.id !== playlistId);
      set({ playlists: updatedPlaylists });
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },
    nextTrack: () => {
      const { currentTrack, myMusic } = get();
      if (!currentTrack) return;

      const currentIndex = myMusic.findIndex((track) => track.src === currentTrack.src);
      const nextIndex = (currentIndex + 1) % myMusic.length; // зацикливаем на первый трек
      const nextTrack = myMusic[nextIndex];

      if (nextTrack) {
        get().playTrack(nextTrack);
      }
    },

    prevTrack: () => {
      const { currentTrack, myMusic } = get();
      if (!currentTrack) return;

      const currentIndex = myMusic.findIndex((track) => track.src === currentTrack.src);
      const prevIndex = (currentIndex - 1 + myMusic.length) % myMusic.length; // зацикливаем на последний трек
      const prevTrack = myMusic[prevIndex];

      if (prevTrack) {
        get().playTrack(prevTrack);
      }
    },

    
  };
  
});

export default useStore;
