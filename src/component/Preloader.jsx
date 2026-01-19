import React from "react";
import logo from './Images/logo.png'
import './Cssfiles/Preeloader.css'

const Preloader = () => {
  return (
    <div className="preloader">
      <img id="logo" src={logo} alt="Logo" />
    </div>
  );
};

export default Preloader;
