import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cssfiles/ProjectPage.css'; // Adjust path
import aromaHack from './certificate-img/hackathon-cert.jpg'
import ClickSound from "./Images/ClickSound.mp3";
import tkd from './certificate-img/tkd.jpg';
import ideathon from './certificate-img/ideathon.jpg'
import nnms from './certificate-img/nnmsitfest.jpg';
import yia from './certificate-img/designer.jpg';
import aromaCard from './certificate-img/aromahacathon.jpg';
import nnmsCard from './certificate-img/itfest.jpg';
 import medal from './certificate-img/medal.jpg'

const Certificate = () => {
  const projects = [
    {
      id: 1,
      title: 'Hackathon',
      desc: 'This is the certificate of Aroma-Hackathon',
      photos:[
         aromaHack,
         aromaCard
      ]
    },
    {
      id: 2,
      title: 'Hackathon',
      desc: 'This is the certificate of Nmss-Hackathon.',
      photos : [
        nnms,
        nnmsCard,

      ]
    },
    {
      id: 3,
      title: 'Ideathon',
      desc: 'This is the certificate of ideathon organized  by New horizon club.',
      photos:[
        ideathon
      ],
    },

    {
      id: 4,
      title: 'Taekwondo',
      desc: 'This is the certificate of black-belt in taekwondo.',
     photos:[tkd]
    },
    {
      id: 5,
      title: 'Medal',
      desc: 'This is the medal and award of best designer organized  by YIA club of Aroma.',
      photos:[
        yia,
      medal,
      ]
    },
    
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const Click = () => {
    const Newaudio = new Audio(ClickSound);
    Newaudio.play();
  }

  return (
    <section className="project-wrapper" id='certificate-box'  >
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5 reveal-text">
          <h1 className='text-center mb-5 fw-bold display-5 project-heading'>My Certificate</h1>
          <p className="project-subtext text-muted mx-auto" >
            Showcasing my achievements and skills through certificates earned with dedication and hard work.
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

export default Certificate;
