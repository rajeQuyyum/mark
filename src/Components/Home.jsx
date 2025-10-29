import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a short loading time before showing the page
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="loader mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
          Welcome, please wait...
        </h2>

        {/* Inline CSS for the spinner animation */}
        <style>{`
          .loader {
            border: 6px solid #e0e0e0;
            border-top: 6px solid #3b82f6; /* blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // When done loading, show your main content
  return (
    <div>
      <NavLink to="/" className="">
      </NavLink>
      <Login />
    </div>
  );
}
