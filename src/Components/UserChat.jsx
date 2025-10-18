import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiSend } from "react-icons/fi";

const socket = io(import.meta.env.VITE_API);

const UserChat = () => {
  // ✅ Try to get user name and email from localStorage
  const storedEmail = localStorage.getItem("chatEmail");
  const storedName = localStorage.getItem("userName"); // <-- store this when user logs in

  const [email, setEmail] = useState(storedEmail || "");
  const [userName, setUserName] = useState(storedName || "");
  const [isEmailSet, setIsEmailSet] = useState(!!storedEmail);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  const API =
    import.meta.env.VITE_API ||
    "http://localhost:3001" ||
    "http://localhost:2000";

  useEffect(() => {
    if (isEmailSet && email) {
      socket.emit("join", email);

      axios.get(`${API}/user/messages/${email}`).then((res) => setMessages(res.data));

      socket.on("newMessage", (msg) => {
        if (msg.email === email) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [isEmailSet, email]);

  useEffect(() => {
    // Auto scroll to bottom when new message comes in
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      email,
      sender: "user",
      text,
      time: new Date().toISOString(), // include timestamp
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="p-4 sm:p-6 md:p-10 w-full max-w-3xl mx-auto mt-28">
        <div className="bg-white w-full max-w-full mx-auto p-4 rounded shadow">
          <div className="max-w-full mx-auto">
            {!isEmailSet ? (
              <div className="bg-gray-400 text-white p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">
                  Enter your email to start chat
                </h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mb-2 p-2 rounded text-black"
                />
                <button
                  className="bg-green-400 py-2 px-4 w-full rounded mt-2 hover:bg-green-500 transition"
                  onClick={() => {
                    setIsEmailSet(true);
                    localStorage.setItem("chatEmail", email);
                    if (userName) {
                      localStorage.setItem("userName", userName);
                    }
                  }}
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  Chat ({userName || email})
                </h2>

                {/* ✅ Scrollable chat area */}
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-2xl shadow-xl w-full overflow-y-auto max-h-80 scroll-smooth">
                  {messages.length === 0 && (
                    <p className="text-center text-white italic">
                      No messages yet...
                    </p>
                  )}

                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col mb-3 ${
                        msg.sender === "user"
                          ? "items-end text-right"
                          : "items-start text-left"
                      }`}
                    >
                      {/* ✅ Sender name */}
                      <p className="text-xs text-white mb-1 font-semibold">
                        {msg.sender === "user"
                          ? userName || "You"
                          : "Admin"}
                      </p>

                      {/* ✅ Message bubble */}
                      <div
                        className={`px-3 py-2 rounded-xl max-w-[70%] break-words whitespace-pre-wrap ${
                          msg.sender === "user"
                            ? "bg-yellow-200 text-black rounded-br-none"
                            : "bg-white text-black rounded-bl-none"
                        }`}
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        <p className="text-sm">{msg.text}</p>
                        {msg.time && (
                          <p className="text-[10px] text-gray-500 mt-1">
                            {formatTime(msg.time)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div ref={chatEndRef} />
                </div>

                {/* Input area */}
                <div className="flex mt-2 gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 p-2 rounded bg-amber-400"
                  />
                  <button
                    onClick={sendMessage}
                    className="text-green-600 text-3xl p-2 rounded hover:bg-green-100 transition"
                  >
                    <FiSend />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserChat;
