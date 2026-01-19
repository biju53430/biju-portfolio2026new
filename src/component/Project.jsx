import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cssfiles/ProjectPage.css'; // Adjust path
import tkd1 from './Images/tkd1.jpg'
import tkd2 from "./Images/tkd2.jpg";
import tkd3 from './Images/tkd3.jpg';
import tkd4 from './Images/tkd4.jpg';
import tkd5 from './Images/pc-tkd.png';
import onlinesop1 from './Images/online-sup1.png';
import o2 from './Images/onlinesup2.png';
import o3 from './Images/onlinesup3.png';
import o4 from './Images/online-sup4.png';
import c1 from './Images/cal1.png';
import c2 from './Images/cal2.png';
import on2 from './Images/online1.png';
import on1 from './Images/online2.png';
import on3 from './Images/online3.png';
import football from './Images/foot1.png';
import ClickSound from "./Images/ClickSound.mp3";
import p1 from './Images/port1.jpg'
import p2 from './Images/port2.jpg'
import p3 from './Images/port3.jpg'
import p4 from './Images/port4.jpg'
import p5 from './Images/port5.jpg'

const Project = () => {
  const projects = [
    {
      id: 1,
      title: 'Taekwondo web',
      desc: 'Website of Nawalpur-itf-taekwondo',
      photos: [
        tkd1,
        tkd2,
        tkd3,
        tkd4,
        tkd5
      ]
    },
    {
      id: 2,
      title: 'Online shopping',
      desc: 'Website of biju online shopping',
      photos: [
        onlinesop1,
        o2,
        o3,
        o4
      ]
    },
    {
      id: 3,
      title: 'Online shopping',
      desc: 'Website of Biju store ',
      photos: [
        on1,
        on2,
        on3
      ]
    },

    {
      id: 4,
      title: 'Portfolio 2025',
      desc: ' My Portfolio of 2025 ',
      photos: [
        p2,
        p1,
        p3,
        p4,
        p5,
      ]
    },
    {
      id: 5,
      title: 'Calender 2025',
      desc: 'Calender of the year 2025',
      photos: [
        c1,
        c2
      ]
    },
    {
      id: 6,
      title: 'Football',
      desc: 'Website of Football',
      photos: [
        football,
      ]
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const Click = () => {
    const Newaudio = new Audio(ClickSound);
    Newaudio.play();
  }

  return (
    <section className="project-wrapper"  >
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5 reveal-text">
          <h1 className='text-center mb-5 fw-bold display-5 project-heading'>My Project</h1>
          <p className="project-subtext text-muted mx-auto" >
            Showcasing my journey as a web developer through projects that blend creativity, functionality, and continuous learning
          </p>
        </div>

        {/* Horizontal Scrolling Row */}
        <div className="row flex-nowrap overflow-auto pb-5 horizontal-scroll-container">
          {projects.map((item, index) => (
            <div
              className="col-11 col-sm-8 col-md-5 col-lg-3 card-animate"
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="custom-card"
                style={{ backgroundImage: `url(${item.photos[0]})`, width: "auto" }}

              >
                <div className="card-overlay">
                  <div className="card-info">
                    <h4 className="fw-bold">{item.title}</h4>
                    <p className="small mb-2 d-none d-md-block">{item.desc}</p>
                    <div className="d-flex gap-2" onClick={Click}>
                      <span
                        className="badge-custom"
                        onClick={() => setSelectedProject(item)}
                      >
                        view
                      </span>
                    </div>
                  </div>
                  <span onClick={Click}>
                    <div className="card-arrow" onClick={() => setSelectedProject(item)}
                    >↗</div>
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            className="custom-modal-backdrop"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="custom-modal-content shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 🔹 Header */}
              <div className="modal-header-custom">
                <h3 className="modal-title-custom">
                  {selectedProject.title}
                </h3>
                <span onClick={Click}>
                  <button
                    className="btn-close-custom"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </button>
                </span>

              </div>

              {/* 🔹 Image Gallery */}
              <div className="modal-body-custom">
                <div className="row g-3 justify-content-center">
                  {selectedProject.photos.map((photo, idx) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={idx}>
                      <img
                        src={photo}
                        alt={`${selectedProject.title} ${idx}`}
                        className="img-fluid modal-img-custom"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 🔹 Footer */}
              <div className="modal-footer-custom" onClick={Click}>
                <button
                  className="btn btn-orange w-100"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Project;
