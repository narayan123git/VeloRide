import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CaptainLogout = () => {
    const captain_token = localStorage.getItem('captain_token')
    const navigate = useNavigate()

    useEffect(() => {
        console.log(captain_token)
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${captain_token}`
            }
        })
            .then((res) => {
      console.log('Logout success:', res.status);
    })
    .catch((err) => {
      console.error('Logout failed:', err?.response?.data?.message || err.message);
    })
    .finally(() => {
      localStorage.removeItem('captain_token');
      navigate('/captain-login');
    });
    }, []) // ✅ only runs once, on first render

    return <div>Logging you out...</div>
}

export default CaptainLogout