import { useEffect, useRef, useState } from "react";
import sound from "./Images/Click.mp3";
const ShakeSound = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const lastShakeTime = useRef(0);

  useEffect(() => {
    let lastX = null;
    let lastY = null;
    let lastZ = null;
    const threshold = 18; // increase if too sensitive

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      if (lastX !== null) {
        const delta =
          Math.abs(acc.x - lastX) +
          Math.abs(acc.y - lastY) +
          Math.abs(acc.z - lastZ);

        const currentTime = new Date().getTime();

        // Prevent multiple triggers quickly
        if (delta > threshold && currentTime - lastShakeTime.current > 1000) {
          lastShakeTime.current = currentTime;

          const audio = new Audio(sound);
          audio.play();

          setShakeCount((prev) => prev + 1);
        }
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    // iPhone permission
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
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Shake your phone 📱</h2>
      <p>Shakes detected: {shakeCount}</p>
    </div>
  );
};

export default ShakeSound;