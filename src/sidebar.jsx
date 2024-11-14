import React from "react";
import './sidebar.css';

import AudioFiles from "./audiofiles.jsx";

export default function Sidebar() {
    return (
        <>
        <div className="scroll_box">
               
                
                <p className="side_bar_button">Моя музыка</p>
                <AudioFiles />
            </div>
  
        </>
    );
}