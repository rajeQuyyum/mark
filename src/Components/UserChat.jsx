import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiSend } from "react-icons/fi";
import NotificationPopup from "./NotificationPopup";

const socket = io(import.meta.env.VITE_API);

const UserChat = () => {
  const storedEmail = localStorage.getItem("chatEmail");
  const storedName = localStorage.getItem("userName");

  const [email, setEmail] = useState(storedEmail || "");
  const [userName, setUserName] = useState(storedName || "");
  const [isEmailSet, setIsEmailSet] = useState(!!storedEmail);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [latestNotification, setLatestNotification] = useState(null); // ✅ Add this
  const chatEndRef = useRef(null);

  const API =
    import.meta.env.VITE_API ||
    "http://localhost:3001" ||
    "http://localhost:2000";

  // ✅ Fetch latest notification
  useEffect(() => {
    if (!email) return;

    const fetchLatest = async () => {
      try {
        const res = await axios.get(`${API}/user/${email}/notifications?limit=1`);
        if (res.data && res.data.length > 0) {
          const newest = res.data[0];
          const dismissedId = localStorage.getItem("dismissedNotificationId");
          if (newest._id !== dismissedId) {
            setLatestNotification(newest);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 10000); // check every 10s
    return () => clearInterval(interval);
  }, [email]);

  // ✅ Socket + chat messages
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
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      email,
      sender: "user",
      text,
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
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
                      <p className="text-xs text-white mb-1 font-semibold">
                        {msg.sender === "user"
                          ? userName || "You"
                          : "Admin"}
                      </p>

                      <div
                        className={`px-3 py-2 rounded-xl max-w-[70%] break-words whitespace-pre-wrap ${
                          msg.sender === "user"
                            ? "bg-yellow-200 text-black rounded-br-none"
                            : "bg-white text-black rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {formatDateTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div ref={chatEndRef} />
                </div>

                <div className="flex mt-2 gap-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 rounded-2 border border-gray-400 outline-none resize-none overflow-y-auto px-3 py-2"
                    rows={2}
                    style={{
                      maxHeight: "50px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
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

      {/* ✅ Popup shows when there's a new notification */}
      <NotificationPopup notification={latestNotification} />

      <Footer />
    </div>
  );
};

export default UserChat;
