import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoadingPage = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#2bda6399] to-[#b368d6] text-white">
    <div className="text-3xl font-bold mb-4">Loading...</div>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#108b3fcb]"></div>
  </div>
)

const UnauthorizedPage = ({ onLogin }) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#b368d6] to-[#2bda6399] text-white">
    <div className="text-3xl font-bold mb-4">Unauthorized</div>
    <div className="mb-6 text-lg">You are not authorized to view this page. Please login as captain.</div>
    <button
      className="bg-[#108b3fcb] text-purple-800 rounded-md px-4 py-2 text-lg font-medium hover:bg-blue-800 hover:text-red-500 transition-all duration-300 ease-in-out"
      onClick={onLogin}
    >
      Go to Captain Login
    </button>
  </div>
)

const CaptainProtectedWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const captain_token = localStorage.getItem('captain_token')
    if (!captain_token) {
      setAuthenticated(false)
      setLoading(false)
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${captain_token}`
      }
    })
      .then(() => {
        setAuthenticated(true)
      })
      .catch(() => {
        localStorage.removeItem('captain_token')
        setAuthenticated(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  if (loading) {
    return <LoadingPage />
  }

  if (!authenticated) {
    return <UnauthorizedPage onLogin={() => navigate('/captain-login')} />
  }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper