// Feedback.js
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const [userEmail, setUserEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  // Start 2-minute timer after user submits email
  useEffect(() => {
    let timer;
    if (submitted && !sent) {
      timer = setTimeout(() => {
        setTimerDone(true);
      }, 1000); // 2 minutes
    }
    return () => clearTimeout(timer);
  }, [submitted, sent]);

  // Send email after timer is done
  useEffect(() => {
    if (timerDone && userEmail && !sent) {
      emailjs
        .send(
          "service_ibhywxj", // Your EmailJS service ID
          "template_1nibsn5", // Your EmailJS template ID
          {
            message: "Thank you for visiting our website!", // Template message
            user_email: userEmail, // Visitor email
          },
          "_xIuPow4i5GD5dBeo" // Your EmailJS public key
        )
        .then(
          (response) => {
            console.log("Email sent successfully!", response.status, response.text);
            setSent(true);
          },
          (error) => {
            console.error("Failed to send email:", error);
          }
        );
    }
  }, [timerDone, userEmail, sent]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim() === "") {
      alert("Please enter a valid email!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Feedback Component</h2>

      {!submitted && (
        <form onSubmit={handleSubmit}>
          <p>Enter your Gmail to receive feedback:</p>
          <input
            type="email"
            placeholder="Enter your Gmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      )}

      {submitted && !sent && <p>⏳ Your feedback email will be sent to {userEmail} in 2 minutes...</p>}
      {sent && <p>✅ Feedback email sent successfully to {userEmail}!</p>}
    </div>
  );
};

export default Feedback;
