import { create } from "zustand";

const useStore = create((set, get) => {
  const audio = new Audio(); // Создаем объект Audio

  const initialMyMusic = JSON.parse(localStorage.getItem("myMusic")) || [];
  const initialPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];

  audio.addEventListener("loadedmetadata", () => {
    set({ duration: audio.duration });
  });

  audio.addEventListener("timeupdate", () => {
    set({ currentTime: audio.currentTime });
  });

  audio.addEventListener("ended", () => {
    get().nextTrack(); // Переход к следующему треку
  });

  return {
    myMusic: initialMyMusic,
    playlists: initialPlaylists,
    audio, // Сохраняем объект audio в Zustand
    currentTrack: null,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    shouldPreventPlay: false,
    currentTrackIndex: null, // Храним индекс текущего трека
    currentContext: null, // Текущий контекст (список треков)

    // Установка текущего контекста треков
    setContext: (context) => set({ currentContext: context }),

    // Методы для авто-воспроизведения
    enableAutoPlay: () => set({ autoPlayEnabled: true }),
    disableAutoPlay: () => set({ autoPlayEnabled: false }),

    // Добавление трека в MyMusic
    addToMyMusic: (track) => {
      set({ shouldPreventPlay: true });
      const myMusic = get().myMusic;
      const isAlreadyAdded = myMusic.some((t) => t.src === track.src);

      if (!isAlreadyAdded) {
        const updatedMyMusic = [...myMusic, track];
        set({ myMusic: updatedMyMusic });
        localStorage.setItem("myMusic", JSON.stringify(updatedMyMusic));
      }

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    // Удаление трека из MyMusic
    removeFromMyMusic: (track) => {
      set({ shouldPreventPlay: true });

      const updatedMyMusic = get().myMusic.filter((t) => t.src !== track.src);
      set({ myMusic: updatedMyMusic });
      localStorage.setItem("myMusic", JSON.stringify(updatedMyMusic));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    // Воспроизведение трека
    playTrack: (track, index) => {
      if (get().shouldPreventPlay) return;

      if (!track || !track.src) {
        console.error("Invalid track data passed to playTrack:", track);
        return;
      }

      const audio = get().audio; // Получаем объект audio из Zustand
      if (!audio) {
        console.error("Audio object is not initialized.");
        return;
      }

      if (get().currentTrack?.src !== track.src) {
        audio.src = track.src;
        set({ currentTrack: track, currentTrackIndex: index });
      }

      audio.play()
        .then(() => set({ isPlaying: true }))
        .catch((err) => console.error("Error playing audio:", err));
    },

    // Пауза трека
    pauseTrack: () => {
      const audio = get().audio;
      if (audio) {
        audio.pause();
        set({ isPlaying: false });
      }
    },

    // Установка текущего времени трека
    setCurrentTime: (time) => {
      const audio = get().audio;
      if (audio) {
        audio.currentTime = time;
        set({ currentTime: time });
      }
    },

    // Установка громкости
    setVolume: (volume) => {
      const audio = get().audio;
      if (audio) {
        audio.volume = volume;
        set({ volume });
      }
    },

    // Установка плейлиста
    setPlaylist: (playlist) => set({ playlist }),

    // Создание нового плейлиста
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
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    // Удаление плейлиста
    removePlaylist: (playlistId) => {
      set({ shouldPreventPlay: true });

      const updatedPlaylists = get().playlists.filter((playlist) => playlist.id !== playlistId);
      set({ playlists: updatedPlaylists });
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));

      setTimeout(() => set({ shouldPreventPlay: false }), 0);
    },

    // Переход к следующему треку
    nextTrack: () => {
      const { currentTrack, currentContext } = get();
      if (!currentTrack || !currentContext) return;

      const currentIndex = currentContext.findIndex(
        (track) => track.src === currentTrack.src
      );
      const nextIndex = (currentIndex + 1) % currentContext.length;
      const nextTrack = currentContext[nextIndex];

      if (nextTrack) {
        get().playTrack(nextTrack, nextIndex);
      }
    },

    // Переход к предыдущему треку
    prevTrack: () => {
      const { currentTrack, currentContext } = get();
      if (!currentTrack || !currentContext || currentContext.length === 0) return;

      const currentIndex = currentContext.findIndex((track) => track.src === currentTrack.src);
      const prevIndex = (currentIndex - 1 + currentContext.length) % currentContext.length;
      const prevTrack = currentContext[prevIndex];

      if (prevTrack) {
        get().playTrack(prevTrack, prevIndex);
      }
    },
  };
});

export default useStore;
