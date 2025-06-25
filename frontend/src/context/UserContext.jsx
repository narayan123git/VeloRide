import axios from 'axios'
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import userSocket from '../socket/userSocket';

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const socket = userSocket

    const [user, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    setUser(res.data.user)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('🟢 Socket connected:', socket.id);
        });
        socket.on('disconnect', () => {
            console.log('🔴 Socket disconnected');
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, []); // Only run once on mount/unmount

    useEffect(() => {
        if (user && user._id) {
            console.log('📡 Re-emitted join after reconnect:', user);
            userSocket.emit('join', { userId: user._id });
        }
    }, [user]);

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext