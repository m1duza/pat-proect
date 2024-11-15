import React from "react";
import Header from "./header";
import './major.css'
import Sidebar from "./sidebar";

import Controll from './controll'
import PlayList from "./playlist";
export default function Major() {
    return(
        <>
            <div className="major_block">
                < Header/>
                <div className="main_major_block">
                    <Sidebar />
                    <PlayList />
                </div>
                <Controll />
            </div>
        </>
    )
}