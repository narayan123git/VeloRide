import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import  { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignUp = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState(1)
  const [vehicleType, setVehicleType] = useState('car')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData =({
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    
    if(response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captain_token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity(1)
    setVehicleType('car')
  }

  return (
    <div className='p-4 md:p-7 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#2bda6399] to-[#b368d6] text-white'>
      <div className="w-full max-w-md md:max-w-2xl">
        <img className='w-16 mb-8' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="VeloRide Logo" />

        <form onSubmit={(e) => submitHandler(e)} action="" className="w-full">
          <div className='flex flex-col md:flex-row gap-4 mb-4'>
            <div className="flex-1">
              <h3 className='text-2xl font-medium mb-2'>First name</h3>
              <input
                required
                className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
                type="text"
                placeholder="Enter your firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <h3 className='text-2xl font-medium mb-2'>Last name</h3>
              <input
                required
                className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
                type="text"
                placeholder="Enter your lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <h3 className='text-2xl font-medium mb-2'>What's our driver's email?</h3>
          <input
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-lg placeholder:text-base'
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-2xl font-medium mb-2'>What's our driver's password?</h3>
          <input
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-lg placeholder:text-base'
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className='text-2xl font-medium mb-2'>Vehicle Color</h3>
          <input
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
            type="text"
            placeholder="Enter vehicle color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />

          <h3 className='text-2xl font-medium mb-2'>Vehicle Plate</h3>
          <input
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
            type="text"
            placeholder="Enter vehicle plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />

          <h3 className='text-2xl font-medium mb-2'>Vehicle Capacity</h3>
          <input
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
            type="number"
            min={1}
            placeholder="Enter vehicle capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />

          <h3 className='text-2xl font-medium mb-2'>Vehicle Type</h3>
          <select
            required
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="taxi">Truck</option>
            <option value="auto">Van</option>
          </select>

          <button
            className='mb-3 bg-[#108b3fcb] text-purple-800 rounded-md px-2 py-2 w-full text-[20px] font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out'
            type="submit"
          >
            Sign Up
          </button>
          <p className='text-center'>Already have account? <Link to='/captain-login' className='text-[#7e4811]'>Login</Link> </p>
        </form>
      </div>

      <div className="w-full max-w-md md:max-w-2xl">
        <Link to={'/signup'}
          className='flex justify-center items-center mt-5 bg-[#7544d8cb] text-[#1ad691] rounded-md px-2 py-2 w-full text-[20px] font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out'
        >Sign up as user</Link>
      </div>
    </div>
  )
}

export default CaptainSignUp