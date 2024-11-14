// PlayList.js
import './playlist.css';
import Playlistwrapper from './playlistwrapper.jsx'
import {  HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import CreatePlaylistModal from './createplaylistmodal';
import PlaylistsView from './playlistview.jsx'
export default function PlayList() {
  return (
    <div className="main_block_play_list">
      <div className="wrapper_for_button">
        <Router>
          <nav className="nav_button">
            <NavLink
              to="/"
              className={({ isActive }) => "wrapper_button" + (isActive ? " active" : "")}
            >
              Главная
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => "wrapper_button" + (isActive ? " active" : "")}
            >
              Мой плейлист
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => "wrapper_button" + (isActive ? " active" : "")}
            >
              Новости
            </NavLink>
          </nav>
          
          <Routes>
            <Route path="/" element={<Playlistwrapper />} />
            <Route path="/about" element={<PlaylistsView />} />
            <Route path="/contact" element={<div></div>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
