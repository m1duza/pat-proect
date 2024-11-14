// PlaylistList.js
import React from 'react';
import useStore from './useStore';


const NewPlaylist = () => {
  const { playlists } = useStore();

  return (
    <div className="playlist-list">
      <h2>Your Playlists</h2>
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            <img
              src={playlist.cover || 'default-cover.png'}
              alt={playlist.name || 'Unnamed Playlist'}
              className="playlist-cover"
            />
            <div className="playlist-info">
              <p>{playlist.name || 'Untitled Playlist'}</p>
              <p>{playlist.description || 'No description available'}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No playlists available. Create one!</p>
      )}
    </div>
  );
};

export default NewPlaylist;
