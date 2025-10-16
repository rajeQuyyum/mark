import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Confirm() {
  return (
    <section className='bg-white block m-auto w-[500px] mt-28 ju py-5 px-4 rounded-md '>
        <div className='mb-5 flex justify-between'>
            <h1>Transaction Recipt</h1>
            <div className='flex flex-col gap-3'>
                <h1>Amount</h1>
                <p>$200,000.00</p>
                <p>sep 22th, 2025 18:10:23</p>
            </div>
        </div>

        <div>
            <div className='flex justify-between mb-5'>
                <h1>Reciever Details</h1>
                <div className='flex gap-2'>
                    <h2>Matthew Gray Owen</h2>
                    <p>Ukrainian credit Union Limited|9010629**</p>
                </div>
            </div>

            <div className='flex justify-between mb-5'>
                <h1>Transaction No</h1>
                <p>4554767867687677897</p>
            </div>

            <div className='flex justify-between mb-5'>
                <h1>Payment method</h1>
                <p>Bank Transfer</p>
            </div>

            <div className='flex justify-between mb-5'>
                <h1>Transaction Date</h1>
                <p>sep 22th, 2025 18:10:23 </p>
            </div>

            <div className='flex justify-center'>
                <NavLink to="/wallet"><h1 className='bg-black text-white px-2 py-3 rounded-md'>Transfer Again</h1></NavLink>
            </div>
        </div>
    </section>
  )
}
