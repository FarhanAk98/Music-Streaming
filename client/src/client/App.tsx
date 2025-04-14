import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Library from "./components/Library";
import AudioPlay from "./components/AudioPlay";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactUs from "./components/Contact Us";
import FeedbackPage from "./components/FeedbackPage";
import Logo from "./assets/Logo.jpg";

type userType = {
  name: string;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<userType | null>(
    JSON.parse(localStorage.getItem("user")!)
  );
  return (
    <>
      <Router>
        <div className="app-container">
          <header className="header">
            <img src={Logo} alt="Logo" className="logo" />
            
           
            
            <nav className="nav-bar">
              <Link to="/">Home</Link>
              {currentUser ? (
                <>
                  <Link to="/library/home">Library</Link>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                      setCurrentUser(null);
                    }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                  <Link to="/feedbackPage">Feedback</Link>
                </>
              )}
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setUser={setCurrentUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/library/:libname" element={<Library />} />
            <Route path="/play/:name" element={<AudioPlay />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/feedbackPage" element={<FeedbackPage />} />
          </Routes>
        </div>
      </Router>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="/about">About us</a>
            <a href="/privacypolicy">Privacy Policy</a>
            <a href="/contactus">Contact Us</a>
          </div>
          <div className="footer-section">
            <h4>Navigation</h4>
            <a href="/">Home</a>
            <a href="/library/home">Library</a>
            <a href="/login">Login</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <a
              href="https://www.facebook.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <div className="copyright">
          <p className="copyright">&copy; {new Date().getFullYear()} Music App. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
