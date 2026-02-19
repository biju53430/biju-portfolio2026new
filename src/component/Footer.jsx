import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cssfiles/Footer.css'
import facebook from "./Images/facebook.png";
import insta from "./Images/instalogo.png";
import github from "./Images/github.png";
import speed from './Images/speed.mp3'



const Footer = () => {
   
     const Sound = () => {
        const audio = new Audio(speed);
        audio.play();
      };
  return (
    
    <footer className="footer-section">
        <div id='hero'></div>
      <div className="container">
        {/* Social Icons Row */}
        <div className="row justify-content-center mb-4">
          <div className="col-auto d-flex gap-3">
            {/* Replace content inside these divs with your logos */}
            <img src={facebook} alt="" id='social-icons' className="icon-placeholder" />
            <img src={insta} alt="" id='social-icons' className="icon-placeholder" />
            <img src={github} alt="" id='social-icons' className="icon-placeholder" />
           
          </div>
        </div>

        {/* Navigation Links Row */}
        <div className="row justify-content-center mb-5">
          <div className="col-auto footer-links">
            <a href="#hero" onClick={Sound}>About</a>
            <a href="#project" onClick={Sound}>Project</a>
            <a href="#skill" onClick={Sound}>Skils</a>
            <a href="#contact" onClick={Sound}>Contact Us</a>
           
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar">
        <p>
          Copyright &copy;2026; Designed by <span className="designer">Biju Chhetry</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;