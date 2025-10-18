import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(import.meta.env.VITE_API);

const AdminChat = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const API =
    import.meta.env.VITE_API ||
    "http://localhost:3001" ||
    "http://localhost:2000";

  // Fetch users
  const fetchEmails = () => {
    axios
      .get(`${API}/admin/messages/emails`)
      .then((res) => setEmails(res.data))
      .catch((err) => console.error("Error fetching emails", err));
  };

  // Handle incoming messages
  useEffect(() => {
    fetchEmails();

    socket.on("newMessage", (msg) => {
      if (msg.email === selectedEmail) {
        // prevent duplicates
        setMessages((prev) => {
          const isDuplicate = prev.some(
            (m) => m.text === msg.text && m.time === msg.time
          );
          if (isDuplicate) return prev;
          return [...prev, msg];
        });
      }

      // Add new user if not in list
      setEmails((prev) => {
        if (!prev.includes(msg.email)) {
          return [msg.email, ...prev];
        }
        return prev;
      });
    });

    return () => socket.off("newMessage");
  }, [selectedEmail]);

  // Load chat messages for selected user
  useEffect(() => {
    if (selectedEmail) {
      socket.emit("join", selectedEmail);
      axios
        .get(`${API}/admin/messages/${selectedEmail}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error loading messages", err));
    }
  }, [selectedEmail]);

  // Auto scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendReply = () => {
    if (!text.trim() || !selectedEmail) return;

    const messageData = {
      email: selectedEmail,
      sender: "admin",
      text,
      time: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  const deleteChat = (email) => {
    if (
      !window.confirm(`Are you sure you want to delete all messages for ${email}?`)
    )
      return;

    axios
      .delete(`${API}/admin/messages/${email}`)
      .then(() => {
        if (selectedEmail === email) {
          setSelectedEmail(null);
          setMessages([]);
        }
        fetchEmails();
      })
      .catch((err) => console.error("Delete failed", err));
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
    <div className="max-w-5xl mx-auto p-4 flex flex-col sm:flex-row gap-4 bg-white rounded shadow">
      {/* Sidebar */}
      <div className="sm:w-1/3 w-full border sm:border-r border-gray-300 rounded p-3">
        <h3 className="font-bold mb-2">Users</h3>
        <div className="space-y-2 overflow-y-auto max-h-80">
          {emails.map((email, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                email === selectedEmail ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <span
                onClick={() => setSelectedEmail(email)}
                className="truncate flex-1"
              >
                {email}
              </span>
              <button
                onClick={() => deleteChat(email)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="sm:w-2/3 w-full flex flex-col">
        {selectedEmail ? (
          <>
            <h3 className="font-bold mb-2">Chat with {selectedEmail}</h3>

            {/* ✅ Scrollable message area */}
            <div
              className="border border-gray-300 rounded p-3 flex-1 bg-gray-50 overflow-y-auto h-80 scroll-smooth"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                scrollbarWidth: "thin",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    msg.sender === "admin" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className="inline-block bg-white px-3 py-2 rounded shadow text-sm"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      maxWidth: "75%",
                    }}
                  >
                    <strong>{msg.sender}:</strong> {msg.text}
                    <div className="text-gray-400 text-xs mt-1">
                      {formatTime(msg.time)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input field */}
            <div className="flex mt-3 gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type reply..."
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                onClick={sendReply}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a user to start chat</p>
        )}
      </div>

      {/* ✅ Custom Scrollbar */}
      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #b0b0b0;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #888;
        }
      `}</style>
    </div>
  );
};

export default AdminChat;
