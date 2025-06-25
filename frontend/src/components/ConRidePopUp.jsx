import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConRidePopUp = ({ setRidePopupPanel, setConRidePopupPanel, ride }) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!otp) return setError('Please enter OTP')

    setLoading(true)
    try {
      const token = localStorage.getItem('captain_token')
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/verify-otp`, {
        rideId: ride._id,
        otp
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setLoading(false)
      if (res.status === 200) {
        alert('✅ OTP Verified. Ride started!')
        setRidePopupPanel(false)
        setConRidePopupPanel(false)
        navigate('/captain-riding', { state: { ride } })
      }
    } catch (err) {
      setLoading(false)
      setError(err?.response?.data?.message || '❌ OTP verification failed')
    }
  }

  return (
    <div>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to continue</h3>

      <div className='flex items-center justify-between bg-yellow-400 rounded-lg p-3'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
          <h2 className='text-lg font-medium'>
            {ride?.userName || 'User'}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>
          {ride?.distance ? `${ride.distance.toFixed(1)} KM` : ''}
        </h5>
      </div>

      <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <div className="w-full text-left">
            <h3 className='text-lg font-medium'>{ride?.pickup || 'Pickup Address'}</h3>
          </div>
        </div>

        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-user-line"></i>
          </h2>
          <div className="w-full text-left">
            <h3 className='text-lg font-medium'>{ride?.destination || 'Destination Address'}</h3>
          </div>
        </div>

        <div className='flex items-center gap-5 p-3'>
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-money-rupee-circle-line"></i>
          </h2>
          <div>
            <h3 className='text-lg font-medium'>₹{ride?.fare || 'N/A'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className='mt-5'>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='bg-[#eee] px-5 py-2 font-mono mb-2 w-full text-base rounded-lg'
          type="text"
          placeholder='Enter OTP'
        />
        {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}

        <div className='w-full flex items-center justify-center gap-3 mt-2'>
          <button
            type='submit'
            disabled={loading}
            className='bg-green-400 text-white font-semibold p-3 rounded-lg w-full'
          >
            {loading ? 'Verifying...' : 'Confirm'}
          </button>
          <button
            type='button'
            onClick={() => setConRidePopupPanel(false)}
            className='bg-red-500 text-white font-semibold p-3 rounded-lg w-full'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConRidePopUp
