// src/api/location.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const geocodeAddress = async (address) => {
  const res = await axios.get(`${BASE_URL}/location/geocode`, { params: { address } })
  return res.data
}

export const reverseGeocode = async (lat, lon) => {
  const res = await axios.get(`${BASE_URL}/location/reverse`, { params: { lat, lon } })
  return res.data
}

export const getRoute = async (startLon, startLat, endLon, endLat) => {
  const res = await axios.get(`${BASE_URL}/location/route`, {
    params: { startLon, startLat, endLon, endLat }
  })
  return res.data
}