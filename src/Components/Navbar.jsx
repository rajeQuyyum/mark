import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../context/ThemeContext'  // ✅ Import theme hook

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [balance, setBalance] = useState(user ? user.balance : 0)
  const [showBalance, setShowBalance] = useState(true)
  const { darkMode, toggleTheme } = useTheme() // ✅ Access global theme

  const API = import.meta.env.VITE_API || 'http://localhost:3001'

  const fetchBalance = () => {
    if (user) {
      axios
        .get(`${API}/user/${user.id}/balance`)
        .then(res => setBalance(res.data.balance))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    fetchBalance()
    const interval = setInterval(fetchBalance, 2000)
    return () => clearInterval(interval)
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  const toggleBalance = () => setShowBalance(!showBalance)

  return (
    <nav className={`fixed top-0 left-0 w-full shadow-md z-50 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
      <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between px-4 py-3 gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xs md:text-sm font-sans text-gray-400">Welcome back!</h1>
            {user && (
              <>
                <h1 className="font-bold text-sm md:text-base">{user.name}</h1>
                <div className="flex items-center gap-2">
                  <h1 className="text-green-500 font-bold text-sm md:text-base">
                    Balance: {showBalance ? `$${balance}` : "****"}
                  </h1>
                  <button onClick={toggleBalance}>
                    {showBalance ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 🌗 Theme toggle */}
          <button
            onClick={toggleTheme}
            className="border px-3 py-1 rounded-md hover:opacity-80 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Logout / Login button */}
          {user ? (
            <button onClick={handleLogout}>
              <HiOutlineArrowLeftOnRectangle className="text-3xl" />
            </button>
          ) : (
            <NavLink to="/login">
              <HiOutlineArrowLeftOnRectangle className="text-3xl" />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
