import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({
            email: email,
            password: password
        })
        // Reset the form fields after submission
        setEmail('')
        setPassword('')
    }
    return (
        <div className='p-4 md:p-7 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
            <div className=" w-full max-w-md md:max-w-2xl">
                <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

                <form onSubmit={(e) =>
                    submitHandler(e)
                } action="" className="w-full">
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
                        Login
                    </button>
                    <p className='text-center'>New here? <Link to='/signup' className='text-[#7e4811]'>Create New Account</Link> </p>
                </form>
            </div>

            <div className="w-full max-w-md md:max-w-2xl">
                <Link to={'/captain-login'}
                    className='flex justify-center items-center mt-5 bg-[#7544d8cb] text-[#1ad691] rounded-md px-2 py-2 w-full text-[20px] font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out'
                >Sign in as driver</Link>
            </div>
        </div>
    )
}

export default UserLogin
