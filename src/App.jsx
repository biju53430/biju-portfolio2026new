import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './component/Contact';
import Footer from './component/Footer';
import "aos/dist/aos.css";
import Project from './component/Project';
import Nav from './component/Nav';
import Skill from './component/Skill';
import Poopup from './component/Poopup';
import { useEffect, useState } from 'react';
import Preloader from './component/Preloader';
import Certificate from './component/Certificate';
import ChatBot from './component/ChatBot';
import './App.css'
import chatImg from './component/certificate-img/speech-bubble_17683625.png'
import goSound from './component/Images/Poopup.mp3';

import ShakeSound from './component/Ghanti';




const App = () => {
  const [openChat, setOpenChat] = useState(false);
  const [loading, setLoading] = useState(true); // Track preloader
  const [showPoopup, setShowPoopup] = useState(false);

  // Preloader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Popup timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPoopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

 

  const chatClick = () => {
    const audio = new Audio(goSound);
    setOpenChat(!openChat);
    audio.play();

  }

  return (
    <>
    <Nav></Nav>

      {/* Blur overlay when chat is open */}
      {openChat && <div className="blur-overlay" onClick={chatClick}></div>}

      <section id='project'>
        <Project />
      </section>

      <section id='skill'>
        <Skill />
      </section>

      {showPoopup && <Poopup />}

      <section id='certificate'>
        <Certificate />
      </section>

      <section id='contact'>
        <Contact />
      </section>

<ShakeSound></ShakeSound>

      <Footer />

      {/* Chat button */}
     
        <img src={chatImg} alt="" className='chat-button'  onClick={chatClick}  style={{ animation: "bounce 3s infinite" }} />
   
   
   

      {/* ChatBot overlay */}
      {openChat && (
        <div className="chatbot-container">
          <ChatBot closeChat={() => setOpenChat(false)}/>
        </div>
      )}
    </>
  );
};

export default App;
