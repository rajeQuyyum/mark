import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoGiftOutline } from 'react-icons/io5'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [balance, setBalance] = useState(user ? user.balance : 0)
  const [showBalance, setShowBalance] = useState(true)

   const API = import.meta.env.VITE_API || 'http://localhost:3001' || 'http://localhost:2000'

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
    <nav className="bg-[#252424bb] fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex flex-row md:flex-row items-center justify-between px-4 py-3 gap-4">
        {/* Left Section - User info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          
          <div>
            <h1 className="text-xs md:text-sm font-sans text-gray-400">
              Welcome back!
            </h1>
            {user && (
              <>
                <h1 className="text-white font-bold text-sm md:text-base">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2">
                  <h1 className="text-green-500 font-bold text-sm md:text-base">
                    Balance: {showBalance ? `$${balance}` : "****"}
                  </h1>
                  <button onClick={toggleBalance}>
                    {showBalance ? (
                      <AiOutlineEyeInvisible className="text-white" />
                    ) : (
                      <AiOutlineEye className="text-white" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        
        <div className=''>
          {user ? (
            <button onClick={handleLogout}>
              <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
            </button>
          ) : (
            <NavLink to="/login">
              <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
