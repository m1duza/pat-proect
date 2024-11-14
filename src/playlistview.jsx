import React from 'react';
import useStore from './useStore';
import './playlistview.css';

const PlaylistViewer = () => {
  const { playlists, removePlaylist } = useStore();

  return (
    <div className='main_playlist_block'>
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist_wrapper2">
          <div className="playlist">
            {playlist.cover && (
              <img className='playlist_cover' src={playlist.cover} alt="Playlist Cover" />
            )}

            <div className="main_major_block">
              <div className="main_description_block">
                <p className='main_playlist_title'>{playlist.name || "Untitled Playlist"}</p>
                <p className='main_playlist_author'>{playlist.description || "No description available"}</p>
              </div>
              <div onClick={() => removePlaylist(playlist.id)}>
         
                <img className='playlist_multiply' src="icons8-умножение-24 (1).png" alt="Delete" />
              </div>
            </div>

        
            <ul>
              {playlist.tracks && playlist.tracks.length > 0 ? (
                playlist.tracks.map((track, index) => (
                  <li key={track.id || index}>
                    {track.name || "Unnamed Track"}
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistViewer;
