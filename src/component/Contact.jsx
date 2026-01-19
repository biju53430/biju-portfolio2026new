import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Cssfiles/Contact.css";
import Time from "./Images/time.png";
import Gmail from "./Images/gmail.png";
import fb from "./Images/facebook.png";
import insta from "./Images/instalogo.png";
import github from "./Images/github.png";
import phone from "./Images/phone.png";
import Click from "./Images/sucess.mp3";
import Clickwrong from "./Images/wrongClick.mp3";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔊 Audio refs (must be created once)
  const successAudio = useRef(null);
  const errorAudio = useRef(null);

  // ✅ Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔁 Helper functions
  const playError = (msg) => {
    if (errorAudio.current) {
      errorAudio.current.currentTime = 0;
      errorAudio.current.play();
    }
    setError(msg);
    setSuccess("");
  };

  const playSuccess = (msg) => {
    if (successAudio.current) {
      successAudio.current.currentTime = 0;
      successAudio.current.play();
    }
    setSuccess(msg);
    setError("");
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // ❌ Empty fields
    if (!name || !email || !message) {
      playError("❌ Please fill all fields");
      return;
    }

    // ❌ Invalid email (THIS NOW WORKS)
    if (!isValidEmail(email)) {
      playError("❌ Please enter a valid email address");
      return;
    }

    // ✅ Valid form
    setLoading(true);

    emailjs
      .sendForm(
        "service_ibhywxj",
        "template_ie18cym",
        form,
        "_xIuPow4i5GD5dBeo"
      )
      .then(
        () => {
          playSuccess("✅ Email sent successfully!");
          setLoading(false);
          form.reset();
        },
        () => {
          playError("❌ Failed to send email. Try again!");
          setLoading(false);
        }
      );
  };

  return (
    <div className="whole-div">
      <div className="contact-container">
        {/* 🔊 Audio elements (IMPORTANT) */}
        <audio ref={successAudio} src={Click} preload="auto" />
        <audio ref={errorAudio} src={Clickwrong} preload="auto" />

        <h2 className="contact-title" >
          Contact <span>Me</span>
          <img src={Gmail} alt="Gmail" id="gmail-img" />
        </h2>

        <p className="contact-subtitle">
          Have a project or question? Let’s talk.
        </p>

        {/* 🔔 Messages */}
       {/* 🔔 Messages */}
{error && (
  <div className="alert alert-orange custom-alert" role="alert" id="alert">
     {error}
  </div>
)}

{success && (
  <div className="alert alert-blue custom-alert" role="alert" id="sucess">
     {success}
  </div>
)}

        <form onSubmit={sendEmail} className="contact-form" noValidate>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <textarea name="message" placeholder="Your Message" />

          <button
            type="submit"
            className="btn btn-gradient"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? (
              <>
                <img src={Time} alt="Loading" className="loading-img" />
                Sending...
              </>
            ) : (
              "Send Message 🚀"
            )}
          </button>

          <a href="tel:+9779709487696" id="phone-box" className="btn btn-gradient">
            Call <img src={phone} alt="phone" id="phone" />
          </a>
        </form>

       <div className="social-icons d-flex gap-3 align-items-center">
  <a href="https://www.facebook.com/AKA10X">
    <img
      src={fb}
      alt="Facebook"
      height="30"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
  <a href="https://www.instagram.com/biju_chhetry/">
    <img
      src={insta}
      alt="Instagram"
      height="30"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
  <a href="https://github.com/biju53430">
    <img
      src={github}
      alt="GitHub"
      height="30"
      style={{ animation: "bounce 2s infinite" }}
    />
  </a>
</div>

      </div>

      
    </div>
  );
};

export default ContactForm;
