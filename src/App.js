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

const App = () => {
  const [loading, setLoading] = useState(true); // Track preloader
  const [showPoopup, setShowPoopup] = useState(false);

  // Preloader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide preloader after 2-3s
    }, 1000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  // Popup timer
  useEffect(() => {
    const Timer = setTimeout(() => {
      setShowPoopup(true);
    }, 60000); // 60s

    return () => clearTimeout(Timer);
  }, []);

  if (loading) {
    // Show only preloader while loading
    return <Preloader />;
  }

  // Once loading is false, render your full app
  return (
    <>
      <Nav />

      <section id='project'>
        <Project />
      </section>

      <section id='skill'>
        <Skill />
      </section>

      {showPoopup && <Poopup />}

      <section id='contact'>
        <Contact />
      </section>

      <Footer />
    </>
  );
};

export default App;
