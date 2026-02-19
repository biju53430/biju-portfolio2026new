import './Cssfiles/Nav.css';
import './Cssfiles/Home.css';
import logo from "./Images/logo.png";
import facebook from "./Images/facebook.png";
import insta from "./Images/instalogo.png";
import github from "./Images/github.png";
import { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import biju from './Images/biju.jpg';
import Click from './Images/Click.mp3';
import ClickSound from "./Images/ClickSound.mp3";
import speed from './Images/speed.mp3'


const Nav = () => {


  // speed sound
    const Sound = () => {
           const audio = new Audio(speed);
           audio.play();
         };


  // Dark/Light mode
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", mode);
  }, [mode]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const modeToggle = () => {
    const audio = new Audio(Click);
    audio.play();
    setMode(!mode);
  };

  // const clickSound = () => {
  //   const audio = new Audio(ClickSound);
  //   audio.play();
  // };

  // Mobile nav open/close
  const [navOpen, setNavOpen] = useState(false);
  const navToggle = () => {
    const audio = new Audio(ClickSound);
    audio.currentTime = 0;
    audio.play();
    setNavOpen(prev => !prev);
  };

  return (
    
    <div className={mode ? "dark-mode" : "light-mode"} style={{ transition: "all 0.3s" }}>

      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg ${mode ? "navbar-dark" : "navbar-light"}`} id='nav'>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="navbar-brand" href="/"><img src={logo} alt="Logo" className="logo" /></span>
            <h1 id='port-text'>Portfolio</h1>
          </div>

          {/* Mobile Nav Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarContent"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            onClick={navToggle}
          >
            {navOpen ? "✖" : "☰"}
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`} id="navbarContent">
            <ul className={`navbar-nav mx-auto mb-2 mb-lg-0 ${mode ? "dark-links" : "light-links"}`} onClick={Sound}>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#project">Project</a></li>
              <li className="nav-item"><a className="nav-link" href="#skill">Skills</a></li>
              <li className="nav-item"><a className="nav-link" href="#certificate">Certificate</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>

            {/* Social Icons + Mode Toggle */}
            <div className="d-flex gap-3 align-items-center" id="social-img">
  <a href="https://www.facebook.com/AKA10X">
    <img
      src={facebook}
      alt="Facebook"
      height="25"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
  <a href="https://www.instagram.com/biju_chhetry/">
    <img
      src={insta}
      alt="Instagram"
      height="25"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
  <a href="https://github.com/biju53430">
    <img
      src={github}
      alt="GitHub"
      height="25"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
  <button
    className={`btn ${mode ? "btn-light" : "btn-dark"} ms-3`}
    onClick={modeToggle}
    id="modeBtn"
  >
    {mode ? "🌞" : "🌙"}
  </button>
</div>

          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home-section d-flex align-items-center" id='about'>
        <div className="container">
          <div className="row align-items-center">

            {/* Text Content */}
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start text-start" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="200">
              <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                HELLO,
              </h1>
              <h2 className="display-5 fw-semibold mb-3" style={{ fontFamily: "'Roboto Slab', serif", }}>
                MY NAME IS <span className="text-center mb-5 fw-bold display-5 skills-heading" style={{ color: mode ? "yellow" : " rgb(179, 97, 42)" }}> Biju Chhetry</span>
              </h2>
              <p className="lead mb-4" style={{ fontFamily: "'Open Sans', sans-serif", }}>
                I am a passionate web developer crafting modern, clean, and interactive user experiences.
              </p>
              <a href="#project" className="btn btn-dark btn-lg" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400" onClick={Sound} id='btn-lg' >
                EXPLORE
              </a>
            </div>

            {/* Image */}
            <div className="col-lg-6 image-section text-center" data-aos="fade-left">
              <img src={biju} alt="Profile" className="img-fluid profile-img" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nav;
