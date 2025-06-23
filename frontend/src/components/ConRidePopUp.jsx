import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConRidePopUp = ({ setRidePopupPanel, setConRidePopupPanel }) => {

    const [otp, setotp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to continue</h3>
            <div className='flex items-center justify-between bg-yellow-400 rounded-lg p-3'>
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
            </div>
            <div className='w-full flex gap-4 mt-6'>
                <form className='w-full' onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <input
                        value={otp}
                        onChange={(e) => {
                            setotp(e.target.value)
                        }}
                        className='bg-[#eee] px-5 py-2 font-mono mb-5 w-full text-base rounded-lg'
                        type="text" placeholder='Enter OTP' />
                    <div className='w-full flex items-center justify-center gap-3'>
                        <Link to='/captain-riding' onClick={() => {
                            setRidePopupPanel(false)
                            setConRidePopupPanel(false)
                        }} className='bg-green-400 text-white font-semibold p-3 rounded-lg w-full'>Confirm</Link>
                        <button onClick={() => {
                            setConRidePopupPanel(false)
                        }} className='bg-red-500 text-white-700 font-semibold p-3 rounded-lg w-full'>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ConRidePopUp