import React from 'react'
import { BsCoin } from 'react-icons/bs'
import { FaCaretUp } from 'react-icons/fa'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { IoArrowUpOutline } from 'react-icons/io5'
import { LiaFunnelDollarSolid } from 'react-icons/lia'
import { MdOutlinePayment } from 'react-icons/md'
import { PiChartLineThin, PiHandDepositLight } from 'react-icons/pi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import Footer from '../Components/Footer'
import InvestmentCard from './InvestmentCard'
import HistoryCard from './HistoryCard'
import DelayedLink from '../Components/DelayedLink'
import { AiOutlineStock } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'

export default function Font() {
  return (
    <section className="lg:mt-28 mt-24 px-4">
      {/* Top action buttons */}
      <div className="bg-[#252424bb] text-white rounded-lg shadow-lg mb-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between gap-6 px-4 py-6">
          <div className="flex flex-col items-center">
            <DelayedLink to="/act">
              <ImProfile className="text-5xl md:text-6xl bg-black rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Profile</h1>
            </DelayedLink>
          </div>
          <div className="flex flex-col items-center">
            <DelayedLink to="/trransfer">
              <IoArrowUpOutline className="text-5xl md:text-6xl bg-black rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Transfer</h1>
            </DelayedLink>
          </div>
          <div className="flex flex-col items-center">
            <DelayedLink to="/stock">
              <AiOutlineStock className="text-5xl md:text-6xl bg-black rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Stock-chat</h1>
            </DelayedLink>
          </div>
          <div className="flex flex-col items-center">
            <DelayedLink to="/bill">
              <MdOutlinePayment className="text-5xl md:text-6xl bg-black rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Pay Bills</h1>
            </DelayedLink>
          </div>
        </div>
      </div>

      {/* Investment & History */}
      <div className="max-w-6xl mx-auto space-y-6 mb-10">
        <InvestmentCard />
        <HistoryCard />
      </div>

      {/* Banking Services */}
      <div className="w-full max-w-6xl mx-auto bg-[#252424bb] rounded-lg shadow-lg mb-24 py-6 px-4">
        <h1 className="mb-6 text-lg md:text-xl font-semibold text-white">
          Banking Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Savings */}
          <div className="rounded-lg p-4 bg-black/30 big2">
            <div className="flex items-center gap-2 mb-2">
              <LiaFunnelDollarSolid className="text-2xl text-amber-900" />
              <div>
                <h1 className="text-sm text-gray-400">Savings Account</h1>
                <p className="font-medium text-lg">SAV</p>
              </div>
            </div>
            <div className="flex gap-2 text-purple-800 text-2xl md:text-4xl mb-2">
              {Array(7).fill(<PiChartLineThin />)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <h1 className="text-gray-300">2.5% APY</h1>
              <div className="flex items-center text-green-500">
                <FaCaretUp />
                <p>+0.25%</p>
              </div>
            </div>
          </div>

          {/* Fixed Deposit */}
          <div className="rounded-lg p-4 bg-black/30 big3">
            <div className="flex items-center gap-2 mb-2">
              <PiHandDepositLight className="text-2xl text-amber-900" />
              <div>
                <h1 className="text-sm text-gray-400">Fixed Deposit</h1>
                <p className="font-medium text-lg">FD</p>
              </div>
            </div>
            <div className="flex gap-2 text-purple-800 text-2xl md:text-4xl mb-2">
              {Array(7).fill(<PiChartLineThin />)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <h1 className="text-gray-300">2.5% APY</h1>
              <div className="flex items-center text-green-500">
                <FaCaretUp />
                <p>+0.25%</p>
              </div>
            </div>
          </div>

          {/* Investment Funds */}
          <div className="rounded-lg p-4 bg-black/30 big">
            <div className="flex items-center gap-2 mb-2">
              <RiMoneyDollarCircleFill className="text-2xl text-amber-900" />
              <div>
                <h1 className="text-sm text-gray-400">Investment Funds</h1>
                <p className="font-medium text-lg">INV</p>
              </div>
            </div>
            <div className="flex gap-2 text-purple-800 text-2xl md:text-4xl mb-2">
              {Array(7).fill(<PiChartLineThin />)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <h1 className="text-gray-300">2.5% APY</h1>
              <div className="flex items-center text-green-500">
                <FaCaretUp />
                <p>+0.25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}
