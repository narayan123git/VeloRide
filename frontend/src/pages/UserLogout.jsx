import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
      console.log('Logout success:', res.status);
    })
    .catch((err) => {
      console.error('Logout failed:', err?.response?.data?.message || err.message);
    })
    .finally(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
    }, []) // ✅ only runs once, on first render

    return <div>Logging you out...</div>
}

export default UserLogout
