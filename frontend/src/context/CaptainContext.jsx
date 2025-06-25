// src/context/CaptainContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import captainSocket from '../socket/captainSocket';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const socket = captainSocket;
  const [captain, setCaptain] = useState({
    email: '',
    password: '',
    fullname: { firstname: '', lastname: '' },
    socketId: '',
    status: 'inactive',
    vehicle: { color: '', plate: '', capacity: 1, vehicleType: 'car' },
    location: { lat: null, lng: null },
    _id: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('captain_token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setCaptain(res.data.captain);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Emit join event whenever socket or captain changes
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
    if (captain && captain._id) {
      console.log('📡 Re-emitted join after reconnect:', captain);
      captainSocket.emit('join', { userId: captain._id });
    }
  }, [captain]);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, loading }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
