import React, { useEffect } from "react";
import "./Cssfiles/Profile.css";
import profileImg from "./Images/biju.jpg";

const Profile = ({setProfileOpen}) => {

  // Disable background scroll while this component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // restore scroll on unmount
    };
  }, []);


  const onClose = ()=>{
setProfileOpen(false)
  }
  return (
    <div className="dashboard-bg overlay">
      <div className="container py-5">
        <div className="dashboard-card">
<button className="close-btn" onClick={onClose}>×</button>
          {/* Header */}
          <div className="dashboard-header">
            <div>
              <h3 className="fw-bold">Welcome back👋</h3>
              <p className="subtitle">
                Stay productive. Stay consistent. Success is built daily.
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="profile-section row align-items-center">
            <div className="col-lg-3 col-md-4 text-center">
              <div className="avatar-wrapper">
                <img src={profileImg} alt="Profile" />
                <span className="status-dot"></span>
              </div>
            </div>

            <div className="col-lg-9 col-md-8">
              <h4 className="fw-bold mb-1">Biju Chhetry</h4>
              <p className="role">Full Stack Developer | React Specialist</p>
              <p className="bio">
                Passionate about building scalable web applications and exploring AI innovations.
                Focused on writing clean code and delivering impactful user experiences.
              </p>

              <div className="stats">
                <div>
                  <h6>40+</h6>
                  <span>Projects</span>
                </div>
                <div>
                  <h6>2+</h6>
                  <span>Years Exp</span>
                </div>
                <div>
                  <h6>98%</h6>
                  <span>Client Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="row g-4 mt-3">
            {[
              { label: "Full Name", value: "Biju Chhetry" },
              { label: "Nick Name", value: "Biju Dev" },
              { label: "Gender", value: "Male" },
              { label: "Country", value: "Nepal, Devchuli-14" },
              { label: "Language", value: "Nepali, English" },
              { label: "Time Zone", value: "GMT +5:45" },
            ].map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="info-card">
                  <label>{item.label}</label>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Email Section */}
          <div className="email-section mt-4">
            <h5 className="fw-bold mb-3">My Email Address</h5>
            <div className="email-box">
              <div>
                <strong>pkrlvlog@gmail.com</strong>
                <p>Active since 2024</p>
              </div>
              <a href="#contact">
                <button className="btn btn-outline-light btn-sm">
                  + Add Email
                </button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;