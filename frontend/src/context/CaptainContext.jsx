import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { SocketContext } from './SocketContext'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
  const { socket } = React.useContext(SocketContext)
  const [captain, setCaptain] = useState({
    email: '',
    password: '',
    fullname: {
      firstname: '',
      lastname: ''
    },
    socketId: '',
    status: 'inactive',
    vehicle: {
      color: '',
      plate: '',
      capacity: 1,
      vehicleType: 'car'
    },
    location: {
      lat: null,
      lng: null
    },
    _id: ''
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('captain_token')
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setCaptain(res.data.captain)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [socket])

  // useEffect(() => {
  //   // This will log the updated captain value whenever it changes
  //   console.log('Captain updated:', captain)
  // }, [captain])

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, loading }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext