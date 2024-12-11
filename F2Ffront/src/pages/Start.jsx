import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(/farmerwithphone.jpg)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-28 h-28 ml-8' src="/f2f.jpg" alt="Farm2Fresh Logo" />
        
        <div className='bg-white bg-opacity-75 py-4 px-6 sm:px-12 mx-4 sm:mx-16 rounded-lg'>
          <h2 className='text-[30px] sm:text-[36px] font-bold text-center'>Get Fresh, Get Healthy with Farm2Fresh</h2>
          
          <p className='text-center text-lg sm:text-xl mt-4'>Access fresh produce straight from the farm to your doorstep.</p>
          
          <Link 
            to='/home' 
            className='flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-lg mt-8 text-lg sm:text-xl hover:bg-green-700 transition-colors duration-300'
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start;
