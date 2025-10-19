import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(import.meta.env.VITE_API);

const AdminChat = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_API || 'http://localhost:3001' || 'http://localhost:2000';

  // Load user emails
  useEffect(() => {
    fetchEmails();

    socket.on("newMessage", (msg) => {
      if (msg.email === selectedEmail) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedEmail]);

  // Load messages for selected email
  useEffect(() => {
    if (selectedEmail) {
      socket.emit("join", selectedEmail);
      axios
        .get(`${API}/admin/messages/${selectedEmail}`)
        .then((res) => setMessages(res.data));
    }
  }, [selectedEmail]);

  const fetchEmails = () => {
    axios
      .get(`${API}/admin/messages/emails`)
      .then((res) => setEmails(res.data));
  };

  const sendReply = () => {
    if (!text.trim() || !selectedEmail) return;
    socket.emit("sendMessage", { email: selectedEmail, sender: "admin", text });
    setText("");
  };

  const deleteChat = (email) => {
    if (!window.confirm(`Are you sure you want to delete all messages for ${email}?`)) return;

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

  // Helper function to format date/time
  const formatDateTime = (dateString) => {
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
    <div className="max-w-5xl mx-auto p-4 flex flex-col sm:flex-row gap-4 bg-white rounded shadow">
      {/* Sidebar */}
      <div className="sm:w-1/3 w-full border sm:border-r border-gray-300 rounded p-3">
        <h3 className="font-bold mb-2">Users</h3>
        <div className="space-y-2">
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
            <div className="border border-gray-300 rounded p-3 flex-1 overflow-y-auto h-72 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    msg.sender === "admin" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="inline-block bg-white px-3 py-1 rounded shadow text-sm break-words whitespace-pre-wrap max-w-full">
                    <strong>{msg.sender}:</strong> {msg.text}
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDateTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default AdminChat;
