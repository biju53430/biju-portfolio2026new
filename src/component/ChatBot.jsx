import axios from "axios";
import { useState, useRef, useEffect } from "react";
import './Cssfiles/chatbox.css';
import sendImg from './certificate-img/send.png';
import stopImg from './certificate-img/stop_13935489.png';
import Click from './Images/Click.mp3'

const ChatBot = ({ closeChat }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);
  const cancelTokenRef = useRef(null);

  const generateAnswer = async () => {
    if (!question.trim()) return;

    const userMessage = question;
    setQuestion("");
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setLoading(true);

    // Cancel previous request if exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Request canceled by user.");
    }

    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyBn7Hmx2yghD7_NsPwvjogL-m1F06qorD0",
        { contents: [{ parts: [{ text: userMessage }] }] },
        { cancelToken: cancelTokenRef.current.token }
      );

      const botAnswer =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer received!";

      setMessages(prev => [...prev, { type: "bot", text: botAnswer }]);
    } catch (err) {
      if (axios.isCancel(err)) {
        setMessages(prev => [
          ...prev,
          { type: "bot", text: "cancelled" }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { type: "bot", text: "Error getting response." }
        ]);
        console.error(err);
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop =
        chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Correct cancel function
  const cancelReq = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Request canceled.");
    }
  };

   const clickSound =()=>{
     const audio= new Audio(Click);
    audio.play();
   }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center chat-bg">
      <div className="card chat-card shadow-lg">

        {/* Header */}
        <div className="card-header chat-header text-center" style={{ position: "relative" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "4vh",
              animation: "bounce 2s infinite",
            }}
          >
            💬
          </span>
          Chat Box
          <button
            onClick={closeChat}
            className="btn btn-danger"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 10px",
            }}
          >
            <span onClick={clickSound}>

            ✖
            </span>
          </button>
        </div>

        <h4
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#333",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Start a Conversation!!
        </h4>

        {/* Chat Window */}
        <div className="card-body chat-window" ref={chatWindowRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.type === "user"
                ? "user-message"
                : "bot-message"
                }`}
            >
              <pre
                style={{
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontFamily:
                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  margin: 0,
                  fontWeight: "500",
                  padding: 0,
                }}
              >
                {msg.type === "user" ? "You: " : "Bot: "}
                {msg.text}
              </pre>
            </div>
          ))}

          {loading && (
            <div className="message bot-message typing" style={{animation: "bounce 2s infinite"}}>  
              Thinking...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="card-footer chat-footer">
          <div className="input-area d-flex align-items-center">
            <button 
            onClick={()=>{alert("feature will add soon!!")}}
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className=" me-2 d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                fontSize: "22px",
                fontWeight: "bold",
                padding: "0",
                
              }}
            >
              +
            </button>
            <input
              type="text"
              className="form-control chat-input me-2"
              placeholder="Type a message..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && generateAnswer()
              }
            />
            <button
              className="send-btn d-flex align-items-center justify-content-center"
              onClick={generateAnswer}
            >
              {loading ? (
                <div className="text-light" onClick={cancelReq}>
                  <img src={stopImg} alt="" style={{ height: "40px" }} />
                </div>
              ) : (
                <img src={sendImg} alt="send" width="20" />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatBot;
