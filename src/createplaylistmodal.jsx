// CreatePlaylistModal.js
import React, { useState } from 'react';
import useStore from './useStore';
import './createPlaylistModal.css';

const CreatePlaylistModal = ({ onClose }) => {
  const { createPlaylist } = useStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !description) {
      console.log("Name and description are required.");
      return;
    }
    console.log("Submit clicked with:", { name, description, cover });
    createPlaylist({ name, description, cover });
    onClose();
  };
  
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='main_title_modal'>Create Playlist</h2>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='titile_input'
        />
        <textarea
        className='description_title'
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input className='file_input' type="file" accept="image/*" onChange={handleCoverChange} />
        {cover && <img src={cover} alt="Cover Preview" className="cover-preview" />}
        <div className="common_block_for_text">
          <div className='modal_create' onClick={handleSubmit}>Create</div>
          <div className='modal_cancel' onClick={onClose}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
