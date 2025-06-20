import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
            <div className='flex items-center justify-between border-2 border-yellow-400 rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Narayan Paul</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.5 KM</h5>
            </div>
            <div className='flex gap-2 w-full justify-between items-center flex-col'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <div className="w-full text-left">
                            <h3 className='text-lg font-medium'>562/11/a</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Rampur, Coochbehar, West bengal</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-user-line"></i>
                        </h2>
                        <div className="w-full text-left">
                            <h3 className='text-lg font-medium'>562/11/a</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Rampur, Coochbehar, West bengal</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-money-rupee-circle-line"></i>                        </h2>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
                        </div>
                    </div>
                </div>
                <Link to='/captain-home' onClick={() => {
                    props.setFinishRidePanel(false)
                    setRidePopupPanel(false)
                    setConRidePopupPanel(false)
                }} className='bg-green-400 text-white font-semibold mt-5 p-3 rounded-lg w-auto'>Finish ride</Link>
                <p className='text-red-500 text-xm mt-10'>Click on "Finish ride", if you have got the payment</p>
            </div>
        </div>
    )
}

export default FinishRide