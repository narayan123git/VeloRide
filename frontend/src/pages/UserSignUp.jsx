import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)

      navigate('/home')
    }
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }

  return (
    <div className='p-4 md:p-7 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
      <div className="w-full max-w-md md:max-w-2xl">
        <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={
          (e) => {
            submitHandler(e)
          }
        } className="w-full">
          <div className='flex flex-col md:flex-row gap-4 mb-4'>
            <div className="flex-1">
              <h3 className='text-2xl font-medium mb-2'>First name</h3>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
                type="text"
                placeholder="Enter your firstname"
              />
            </div>
            <div className="flex-1">
              <h3 className='text-2xl font-medium mb-2'>Last name</h3>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-base placeholder:text-sm'
                type="text"
                placeholder="Enter your lastname"
              />
            </div>
          </div>

          <h3 className='text-2xl font-medium mb-2'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-lg placeholder:text-base'
            type="email"
            placeholder="Enter your email"
          />

          <h3 className='text-2xl font-medium mb-2'>What's your password?</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] text-black rounded-md px-2 py-2 border border-blue-500 mb-4 w-full text-lg placeholder:text-base'
            type="password"
            placeholder="Enter your password"
          />
          <button
            className='mb-3 bg-[#108b3fcb] text-purple-800 rounded-md px-2 py-2 w-full text-[20px] font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out'
            type="submit"
          >
            Sign Up
          </button>
          <p className='text-center'>Already have account? <Link to='/login' className='text-[#7e4811]'>Login</Link> </p>
        </form>
      </div>

      <div className="w-full max-w-md md:max-w-2xl">
        <Link to={'/captain-signup'}
          className='flex justify-center items-center mt-5 bg-[#7544d8cb] text-[#1ad691] rounded-md px-2 py-2 w-full text-[20px] font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out'
        >Sign up as driver</Link>
      </div>
    </div>
  )
}

export default UserSignUp