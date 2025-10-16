import React from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'


export default function Transfer() {
  return (
    <section>
        <Navbar />
        <div className='pt-40 h-svh'>
        <div className='bg-amber-300 w-[1000px] ml-52 text-center py-6 mb-8'>
        <h1 className='text-2xl font-serif'>Choose Transfer Method</h1>
    </div>

    <div className='text-center mb-3'>
        <h1 className='text-sm text-gray-500'>Available Balance</h1>
        <h1 className='text-green-500 text-3xl'>$10,000</h1>
    </div>

     <div className='bg-[#252424bb]   block m-auto w-[400px]  rounded-lg border border-r-amber-600 mb-2.5'>
         <div className='flex justify-between items-center py-3 px-3'>
        <div >
            <p className='text-gray-500 mb-2'>Wallet Transaction</p>
            <div className='flex items-center gap-2.5'>
                <img className='w-[40px] h-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFBJ4T8XQREvouwtK6Z9fAixg_AaEgZLFBA&s" alt="" />

                <NavLink to="/wallet"><h1 className='text-white text-lg font-serif'>Card/Debit Card</h1></NavLink>
            </div>
        </div>
        <div>
            <h1 className='text-green-500 text-lg'>$10,000</h1>
        </div>
         </div>
        </div>

        <div className='bg-[#252424bb]   block m-auto w-[400px] py-3 px-4 rounded-lg border border-r-amber-600 mb-2.5'>
            <h1 className='text-gray-500 mb-2'>Card/Bank Account</h1>

            <div className='flex gap-2.5 items-center'>
                <img className='w-[40px] h-10 rounded-full' src="https://media.istockphoto.com/id/903337960/vector/realistic-detailed-credit-card.jpg?s=612x612&w=0&k=20&c=UwLT-Ruldc2jGZD-oBfqLr5zbH3jKU5VDQimQJ6sTm4=" alt="" />
               <NavLink to="/card"><h1 className='text-white text-lg font-serif'>Card/Debit Card</h1></NavLink>

            </div>
        </div>

         <div className='bg-[#252424bb]   block m-auto w-[400px] py-3 px-4  rounded-lg border border-r-amber-600 mb-2.5'>
            <h1 className='text-gray-500'>Card/Bank Account</h1>

            <div className='flex items-center gap-2.5'>
                <img className='w-[40px] h-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s" alt="" />
               <div>
                <NavLink to=""><h1 className='text-lg text-white font-serif'>My Savings Acoount (*******564)</h1></NavLink>
               </div>

            </div>
        </div>

        

    
    </div>
      <Footer />
    </section>
  )
}
