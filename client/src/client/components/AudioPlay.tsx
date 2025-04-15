import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useParams, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./AudioPlay.css";
import logo from '../assets/Logo.jpg';

function AudioPlayer() {
  const handle = useFullScreenHandle();
  const [isFull, setIsFull] = useState(false);
  const params = useParams();
  const { state } = useLocation();
  const src = state?.src;
  const album = state?.album;

  useEffect(() => {
    setIsFull(handle.active);
  }, [handle.active]);

  return (
    <>
      {/* Fullscreen Music Player */}
      <FullScreen handle={handle}>
        <div className="music-container">
          {/* Song Card */}
          <div className="music-card">
            <img src={album} alt="album art" />
            <h4>{params.name}</h4>
            <ReactAudioPlayer src={src} autoPlay controls />

            {!isFull && (
              <button className="fullscreen-btn" onClick={handle.enter} title="Enter Full Screen">
                &#x26F6;
              </button>
            )}
          </div>
        </div>
      </FullScreen>
    </>
  );
}


export default AudioPlayer;
