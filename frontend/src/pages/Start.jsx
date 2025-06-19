import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const Start = () => {
  const user=useContext(UserDataContext)
  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div
        className='absolute h-screen w-full pt-8 flex justify-between flex-col
          bg-[url("https://img.freepik.com/free-vector/taxi-app-interface-concept_23-2148496309.jpg?ga=GA1.1.1521761834.1750169492&semt=ais_hybrid&w=740")]
          bg-no-repeat bg-cover
          bg-center
          md:bg-[position:0px_-180px] md:bg-cover
        '
      >
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white pb-7 px-8 md:mt-32'>
          <h2 className='text-2xl pt-5 md:pt-0 font-bold mb-4 text-center'>
            Get started with Uber
          </h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-2xl rounded-b-2xl mt-3'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start