import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiSend } from "react-icons/fi";

const socket = io(import.meta.env.VITE_API);

const UserChat = () => {
  const [email, setEmail] = useState("");
  const [isEmailSet, setIsEmailSet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_API || 'http://localhost:3001' || 'http://localhost:2000'

  useEffect(() => {
    if (isEmailSet) {
      socket.emit("join", email);

      axios.get(`${API}/user/messages/${email}`)
        .then((res) => setMessages(res.data));

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

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("sendMessage", { email, sender: "user", text });
    setText("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-4 sm:p-6 md:p-10 w-full max-w-3xl mx-auto mt-28">
       

        <div className="bg-white w-full max-w-full mx-auto p-4 rounded shadow">
          <div className="max-w-full mx-auto">
            {!isEmailSet ? (
              <div className="bg-gray-400 text-white p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">Enter your email to start chat</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mb-2 p-2 rounded text-black"
                />
                <button
                  className="bg-green-400 py-2 px-4 w-full rounded mt-2 hover:bg-green-500 transition"
                  onClick={() => setIsEmailSet(true)}
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">User Chat ({email})</h2>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-2xl shadow-xl w-full overflow-auto max-h-80">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                    >
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
                </div>

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
