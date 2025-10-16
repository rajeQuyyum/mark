import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Card() {
  return (
  <section>
    <Navbar />
     <div className='py-20'>

     <div className='bg-amber-300 w-[1000px] ml-52 mb-10 text-center py-6 mt-14 text-2xl font-serif'>
        <h1>Choose bank</h1>
     </div>

     <div className='border border-r-amber-600  mb-5 ml-52 w-[1000px] text-amber-50 bg-[#252424bb] rounded-lg'>
       <div className='flex items-center px-2 py-4'>
        <CiSearch className='text-4xl' />
        <input className='py-2 w-[400px]'  type="text" placeholder='search'  />
       </div>
     </div>

     <div className='text-white ml-52 font-serif text-2xl'>
        <h1>All bank</h1>
     </div>

     <div className='ml-52 w-[1000px]  bg-[#252424bb] rounded-lg'>
       <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
       <NavLink to="/glo"><img src="https://bank-paylio.netlify.app/cointex/images/card/card3.jpg" alt="" /></NavLink>
        <NavLink to="/glo"><h1 className='text-amber-50 text-lg font-sans'>Global Card</h1></NavLink>
       </div>

        <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
        <NavLink to="/tech"><img src="https://bank-paylio.netlify.app/cointex/images/card/card4.jpg" alt="" /></NavLink>
       <NavLink to="/tech"><h1 className='text-amber-50 text-lg font-sans'>Techcombank</h1></NavLink>
       </div>

        <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
       <NavLink to="/acb"><img src="https://bank-paylio.netlify.app/cointex/images/card/card5.jpg" alt="" /></NavLink>
       <NavLink to="/acb"> <h1 className='text-amber-50 text-lg font-sans'>ACB</h1></NavLink>
       </div>

        <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
      <NavLink to="/citi"><img src="https://bank-paylio.netlify.app/cointex/images/card/card7.jpg" alt="" /></NavLink>
       <NavLink to="/citi"><h1 className='text-amber-50 text-lg font-sans'>CitiBank</h1></NavLink>
       </div>

        <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
       <NavLink to="/star"><img src="https://bank-paylio.netlify.app/cointex/images/card/card6.jpg" alt="" /></NavLink>
        <NavLink to="/star"><h1 className='text-amber-50 text-lg font-sans'>Five Star Bank</h1></NavLink>
       </div>

       <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
       <NavLink to="/chhase"><img src="https://bank-paylio.netlify.app/cointex/images/card/card9.jpg" alt="" /></NavLink>
        <NavLink to="/chhase"><h1 className='text-amber-50 text-lg font-sans'>ChaseBank</h1></NavLink>
       </div>

        <div className='flex items-center gap-5 pl-5 py-2 border-b-1'>
       <NavLink to="/vin"><img src="https://bank-paylio.netlify.app/cointex/images/card/card10.jpg" alt="" /></NavLink>
       <NavLink to="/vin"> <h1 className='text-amber-50 text-lg font-sans'>VietinBank</h1></NavLink>
       </div>
     </div>
   </div>
   <Footer />
  </section>
  )
}
