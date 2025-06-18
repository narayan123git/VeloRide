import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
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
    }
  })

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext