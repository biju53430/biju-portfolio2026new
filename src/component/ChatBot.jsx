import axios from "axios";
import { useState, useRef, useEffect } from "react";
import './Cssfiles/chatbox.css';
import sendImg from './certificate-img/send.png';

const ChatBot = ({closeChat}) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Array to store history
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);
  const cancelTokenRef = useRef(null); // For canceling requests

  const generateAnswer = async () => {
    if (!question.trim()) return;

    const userMessage = question;
    setQuestion(""); // Clear input immediately

    // Add user message to history
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setLoading(true);

    // Cancel previous request if exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Request canceled by user.");
    }
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyDMqIFtS8U8BussFBMb4g52zYar84B_HLc",
        { contents: [{ parts: [{ text: userMessage }] }] },
        { cancelToken: cancelTokenRef.current.token }
      );

      const botAnswer =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer received!";

      // Add bot response to history
      setMessages(prev => [...prev, { type: "bot", text: botAnswer }]);
    } catch (err) {
      if (axios.isCancel(err)) {
        // Request was canceled
        setMessages(prev => [...prev, { type: "bot", text: "Bot response canceled." }]);
      } else {
        setMessages(prev => [...prev, { type: "bot", text: "Error gettining response." }]);
        console.error(err);
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center chat-bg">
      <div className="card chat-card shadow-lg">

        {/* Header */}
        <div className="card-header chat-header text-center">
       <span style={{ display: "inline-block",fontSize:"4vh", animation: "bounce 2s infinite"  }}>💬</span>
Chat Box
          <button onClick={closeChat} className="btn btn-danger">X</button>  

        </div>
        {/* Chat Window */}
            <h4
  style={{
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    color: "#333",
    textAlign: "center",
    marginBottom: "15px",
    background:"tranparent"
  }}
>
  Start a Conversation!!
</h4>

        <div className="card-body chat-window" ref={chatWindowRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.type === "user" ? "user-message" : "bot-message"}`}
            >
               <pre
                
  style={{
    width: "100%",
    whiteSpace: "pre-wrap",   // preserves line breaks
    wordWrap: "break-word",   // wrap long lines
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // clean font
    fontSize: "14px",
    lineHeight: "1.5",        // better spacing for paragraphs
    margin: 0,                // remove default pre margin
    fontWeight:"500",
    padding: 0,               // remove extra padding
  }}
>
    {msg.type === "user" ? "You: "  : " Bot: "}
    
   
  {msg.text}
</pre>



            </div>
          ))}
          {loading && (
            <div className="message bot-message typing">Typing...</div>
          )}
        </div>

        {/* Input Area */}
        <div className="card-footer chat-footer">
          <div className="input-area d-flex align-items-center">
            <input
              type="text"
              className="form-control chat-input me-2"
              placeholder="Type a message..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateAnswer()}
              disabled={false} // Input always enabled
            />
            <button
              className="send-btn d-flex align-items-center justify-content-center"
              onClick={generateAnswer}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light"></div>
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
