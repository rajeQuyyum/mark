import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Citi() {
  return (
    <section> 
        <Navbar />
    <div className='pt-20 h-svh mb-10'>
     
     <div className='bg-amber-300 w-[1000px] ml-52 mb-10 text-center py-6 mt-14 text-2xl font-serif'>
        <h1>Recharge</h1>
     </div>

     <div className='ml-52 w-[1000px]  bg-[#252424bb] rounded-lg py-5 mb-10'>
        <div className='flex justify-between items-center pb-10 px-8'>
            <h1 className='text-sm text-gray-500 font-sans'>Your Balance:</h1>
            <h1 className='text-white text-2xl'>$10,000.00</h1>
        </div>
        <input className='w-[900px] m-auto block h-10 border border-gray-700 outline-none rounded-lg text-white pl-2' type="text" />
     </div>

     <div className='text-white font-serif text-2xl ml-58 mb-3'>
        <h1>Amount Money</h1>
     </div>

     <div className='ml-52 text-white flex w-[1000px] justify-between px-10 mb-5'>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$50</h1>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$100</h1>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$200</h1>
     </div>

     <div className='ml-52 text-white flex w-[1000px] justify-between px-10 mb-36'>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$500</h1>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$1000</h1>
        <h1 className='bg-[#252424bb] rounded-lg hover:border border-green-500 w-[300px] py-2 text-center'>$2000</h1>
     </div>


     <div className='w-[1000px] bg-green-500 text-white ml-52 py-4 text-center text-lg font-serif rounded-lg'>
       <h1>Confirm</h1>
     </div>
     </div>
     <Footer />
   </section>
  )
}
