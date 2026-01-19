import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cssfiles/Skill.css";
import Html from './Images/html.png';
import Js from './Images/javascript.png';
import css from './Images/css-3.png';
import tcss from './Images/tailwind.png';
import bootstrap from './Images/bootstrap.png';
import c from './Images/letter-c.png';
import video from './Images/video.png';
import photo from './Images/gallery.png';
import next from './Images/next.png';
import react from './Images/react.png';
import web from './Images/webdesign.png';
const skills = [
  { name: "HTML", img: Html },
  { name: "CSS", img: css },
  { name: "JavaScript", img: Js },
  { name: "React JS", img: react },
  { name: "Next JS", img: next },
  { name: "Bootstrap", img: bootstrap },
  { name: "Tailwind CSS", img: tcss },
  { name: "C", img: c },
  { name: "Website Designing", img: web },
  { name: "Video Editing", img: video },
  { name: "Photo Editing", img: photo},
];
const SkillsSection = () => {
  const skillRefs = useRef([]);
  const [scrollDir, setScrollDir] = useState("down");

  // Detect scroll direction
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class based on scroll direction
            entry.target.classList.add(
              scrollDir === "down" ? "fade-in-up" : "fade-in-down"
            );
          } else {
            entry.target.classList.remove("fade-in-up", "fade-in-down");
          }
        });
      },
      { threshold: 0.1 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [scrollDir]);

  return (
    <section className="skills-section py-5 text-light">
  <div className="container">
    <h2 className="text-center mb-5 fw-bold display-5 skills-heading">
      My Skills
    </h2>
    <div className="row justify-content-center g-4">
      {skills.map((skill, idx) => (
        <div
          key={idx}
          ref={(el) => (skillRefs.current[idx] = el)}
          className="col-6 col-md-4 col-lg-3 skill-card text-center p-4 rounded shadow skill-hover"
          style={{ animationDelay: `${idx * 0.15}s` }}
        >
          <div className="skill-icon mb-3">
            {/* Optional: add icons here */}
           <img src={skill.img} alt="" style={{height:"50px"}} />
          </div>
          <h5 className="fw-semibold">{skill.name}</h5>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default SkillsSection;
