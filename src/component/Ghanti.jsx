import { useEffect, useRef, useState } from "react";
import sound from "./Images/bell.mp3";
import "./Cssfiles/Ghanti.css";
import Ghanti from './Images/ghanti.png';
import vibGhanti from './Images/vib-ghanti.jpg';

const ShakeSound = ({closeGhanti}) => {
  const [shakeCount, setShakeCount] = useState(0);
  const shaking = useRef(false); // Prevent multiple triggers too quickly
  const [shakeSound, setShakeSound] = useState(false);
  const timerRef = useRef(null); // Ref for 3-second timer

  // Function to show vib image and play sound
  const triggerGhanti = () => {
    setShakeSound(true); // Show vib image
    const audio = new Audio(sound);
    audio.play();
    setShakeCount(prev => prev + 1);

    // Reset previous timer if exists
    if (timerRef.current) clearTimeout(timerRef.current);

    // Hide vib image after 3 seconds
    timerRef.current = setTimeout(() => {
      setShakeSound(false);
      timerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    let lastX = null;
    let lastY = null;
    let lastZ = null;
    const threshold = 18;

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      if (lastX !== null) {
        const delta =
          Math.abs(acc.x - lastX) +
          Math.abs(acc.y - lastY) +
          Math.abs(acc.z - lastZ);

        // Only trigger if not already shaking
        if (delta > threshold && !shaking.current) {
          shaking.current = true;

          triggerGhanti(); // Play sound & show vib image

          // Reset shaking state after 0.5 second to allow next shake
          setTimeout(() => {
            shaking.current = false;
          }, 500);
        }
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    const requestPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("devicemotion", handleMotion);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        window.addEventListener("devicemotion", handleMotion);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="whole-box" onClick={triggerGhanti}>
      <div className="shake-container">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }} className="text">
          राष्ट्रिय स्वतन्त्र पार्टी
<button className="close-btn" onClick={closeGhanti}>✖</button>
        </h2>
        {/* Show vibration or default image */}
        {shakeSound ? (
          <img src={vibGhanti} className="Ghanti-img" alt="vibration" />
        ) : (
          <img src={Ghanti} className="Ghanti-img" alt="default" />
        )}

        <div className="shake-count">{shakeCount}</div>
      </div>
    </div>
  );
};

export default ShakeSound;