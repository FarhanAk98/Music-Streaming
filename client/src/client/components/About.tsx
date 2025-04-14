import React from "react";
import "./About.css"; 
import AnoutImage from "../assets/Anout.jpg"; // Replace with the correct image path
import logo from '../assets/Logo.jpg'; // Your logo image path

const About: React.FC = () => {
  return (
    <div className="about-container">
      
      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        
      </div>

      {/* About Content Section */}
      <div className="about-content">
        <div className="about-image">
          <img src={AnoutImage} alt="Listening to Music" />
        </div>
        <div className="about-text">
          <h1>ABOUT <span className="highlight">US</span></h1>
          <p>
            Welcome to <strong>Our Music App</strong>, where diverse melodies intertwine
            to create a harmonious blend of genres. Explore our platform to discover
            the captivating fusion of rhythms from around the world, transcending
            boundaries and embracing musical diversity.
          </p>
          <p>
            At <strong>Our Music App</strong>, we celebrate the art of blending rhythms,
            weaving together different musical styles into a seamless tapestry of sound.
            Join us on a journey that embraces cultural fusion, rhythmical exploration,
            and the universal language of music.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
