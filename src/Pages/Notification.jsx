import React, { useState } from 'react'
import { MdOutlineTouchApp } from 'react-icons/md'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Notification() {
     const [display, setDisplay] = useState(false)
  return (
    <section>
        <Navbar />
    <div className=' pt-28 ml-52'>
       <div className='bg-amber-300 w-[1000px] py-5 rounded-lg text-2xl font-serif mb-10'>
        <h1 className='text-center'>Hot News</h1>
       <i className='' onClick={() => setDisplay(prev => !prev)}><MdOutlineTouchApp className='block ml-auto' /></i>
       </div>


       <div className='w-[1000px] flex gap-10 mb-5'>
        <div className='bg-[#252424bb] rounded-lg '>
            <img className='w-[480px] rounded-t-lg mb-2' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className=' text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>

        <div className='bg-[#252424bb] '>
            <img className='w-[480px] mb-2 rounded-t-lg' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className='text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>
       </div>


        <div className='w-[1000px] flex gap-10 mb-5'>
        <div className='bg-[#252424bb] rounded-lg '>
            <img className='w-[480px] rounded-t-lg mb-2' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className=' text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>

        <div className='bg-[#252424bb] '>
            <img className='w-[480px] mb-2 rounded-t-lg' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className='text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>
       </div>


        <div className='w-[1000px] flex gap-10 mb-5'>
        <div className='bg-[#252424bb] rounded-lg '>
            <img className='w-[480px] rounded-t-lg mb-2' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className=' text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>

        <div className='bg-[#252424bb] '>
            <img className='w-[480px] mb-2 rounded-t-lg' src="https://bank-paylio.netlify.app/cointex/images/blog/blog1.jpg" alt="" />
            <p className='text-gray-500 pl-4 mb-1'>Lorem, ipsum.</p>
            <h1 className='text-white font-light pl-4 mb-1.5'>Lorem ipsum dolor sit amet.</h1>
        </div>
       </div>




         






       <div className={`top-80 w-[1020px] bg-[#181818] py-6 rounded-lg absolute transition-all delay-75 duration-75 ease-in-out ${display ? 'left-50' : 'left-[-100%]'}`}>

       <div className='border-b-1 mb-5 text-gray-500 py-1 '>
         <h1 className='mb-2 pl-4'>Filters</h1>
       </div>

       <h1 className='text-white mb-5 pl-4'>Time</h1>

       <div className='flex justify-between px-6'>
        <div className='mb-3 text-center'>
            <h1 className='text-gray-500 border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 hover:border-green-500 hover:text-white'>All</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>24 Hours</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>This Month</h1>
        </div>

        <div className='pl-4 mb-3 text-center'>
            <h1 className='text-gray-500 border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 hover:border-green-500 hover:text-white'>1 Hour</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>This Week</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>NFT</h1>
        </div>
        

       </div>

       <h1 className='text-white mb-5 pl-4'>Categories</h1>

       <div className='flex border-b-1 mb-5 text-gray-500 justify-between mx-6'>
        <div className='mb-3 text-center'>
            <h1 className='text-gray-500 border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 hover:border-green-500 hover:text-white'>All</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>ETH</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>Crypto</h1>
        </div>

        <div className='pl-4 mb-3 text-center'>
            <h1 className='text-gray-500 border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 hover:border-green-500 hover:text-white'>Bitcoin</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>NFT</h1>
            <h1 className='border border-gray-600 w-[450px] mb-3 h-10 rounded-lg py-2 text-gray-500 hover:border-green-500 hover:text-white'>NFT</h1>
        </div>
        

       </div>

       <div className='flex justify-between px-6'>
        <div className='bg-gray-300 w-[450px] rounded-lg text-center py-2'>
            <h1>Reset</h1>
        </div>
         <div className='bg-green-400 w-[450px] rounded-lg text-center py-2'>
            <h1>Reset</h1>
        </div>
        
       </div>
        
      </div>

       
    </div>
    <Footer />
    </section>
  )
}
