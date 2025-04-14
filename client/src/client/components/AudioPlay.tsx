import ReactAudioPlayer from "react-audio-player";
import { useParams, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./AudioPlay.css";
import logo from '../assets/Logo.jpg';
import { useEffect, useState, useRef } from "react";

function AudioPlayer() {
  const handle = useFullScreenHandle();
  const params = useParams();
  const { state } = useLocation();
  const player = useRef<ReactAudioPlayer>(null);
  const [playing, setPlaying] = useState<Boolean>(false)
  const src = state?.src;
  const album = state?.album;

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="fullscreen-btn" onClick={handle.enter}>Full Screen</button>
      </header>

      {/* Fullscreen Music Player */}
      <FullScreen handle={handle}>
        <div className="music-container">
          <img className={playing?"":"nospin"} src={album} alt="album art" />
          <h4>{params.name}</h4>
          <ReactAudioPlayer
            ref={player}
            onPause={()=>setPlaying(false)}
            onPlay={()=>setPlaying(true)}
            src={src} 
            autoPlay 
            controls 
          />
        </div>
      </FullScreen>
    </>
  );
};

export default AudioPlayer;
