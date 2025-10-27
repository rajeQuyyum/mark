import React from 'react'
import { BsCoin } from 'react-icons/bs'
import { FaRegAddressCard, FaRocketchat } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import DelayedLink from './DelayedLink'

export default function Footer() {
  return (
    <footer className="bg-[#252424bb] text-gray-400 py-4 fixed bottom-0 left-0 w-full z-50">
      <ul className="flex justify-around items-center max-w-screen-md mx-auto px-4">
        {/* Home */}
        <li>
          <DelayedLink to="/home">
            <div className="flex flex-col items-center">
              <IoMdHome className="text-green-500 text-2xl md:text-3xl" />
              <h1 className="text-xs md:text-sm">Home</h1>
            </div>
          </DelayedLink>
        </li>

        {/* Invest */}
        <li>
          <DelayedLink to="/invest">
            <div className="flex flex-col items-center">
              <BsCoin className="text-xl md:text-2xl" />
              <h1 className="text-xs md:text-sm">Invest</h1>
            </div>
          </DelayedLink>
        </li>

        {/* Cards */}
        <li>
          <DelayedLink to="/crd">
            <div className="flex flex-col items-center">
              <FaRegAddressCard className="text-xl md:text-2xl" />
              <h1 className="text-xs md:text-sm">Cards</h1>
            </div>
          </DelayedLink>
        </li>

        {/* Chat */}
        <li>
          <DelayedLink  to="/msg">
            <FaRocketchat className="text-3xl md:text-4xl text-green-500" />
          </DelayedLink >
        </li>
      </ul>
    </footer>
  )
}
