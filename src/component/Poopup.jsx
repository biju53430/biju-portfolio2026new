import './Cssfiles/Poopup.css';
import React, { useRef, useState } from "react";
import audio from './Images/Wow.mp3';

const Poopup = () => {
  const audioRef = useRef(null);
  const [text, setText] = useState("You have a good news 😊"); // Initial text
  const [btn, setBtn] = useState("View it"); // Initial button text
  const [showPopup, setShowPopup] = useState(true); // Track if popup is visible

  // Play audio when popup is clicked
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked:", err);
      });
    }
  };

  // Handle button click
  const viewClick = () => {
    if (btn === "View it") {
      // First click: change text and button
      setText("You've been on this website for 1 minutes. Thank you for staying! 😊🎉");
      setBtn("Close");

      // Play audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
      }

    } else if (btn === "Close") {
      // Second click: close popup
      setShowPopup(false);
    }
  };

  if (!showPopup) return null; // Do not render anything if popup is closed

  return (
    <div className="poop-box" onClick={handlePlayAudio}>
      <div className='Inner-poop'>
        <h1 className='text'>
          {text} {/* Render dynamic text */}
        </h1>
        <button className='btn btn-danger' onClick={viewClick}>
          {btn}
        </button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={audio} />
    </div>
  );
};

export default Poopup;
