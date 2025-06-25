// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASE_URL_1, {
  transports: ['websocket'],
});

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketRef = useRef(socket);
  const [userInfo, setUserInfo] = useState(null); // Save last join info

  useEffect(() => {
    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id);
      if (userInfo?.userId && userInfo?.userType) {
        socket.emit('join', userInfo);
        console.log('📡 Re-emitted join after reconnect:', userInfo);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo]);

  const sendMessage = (event, payload) => {
    if (event === 'join') setUserInfo(payload);
    socket.emit(event, payload);
  };

  const onMessage = (event, callback) => {
    socket.on(event, callback);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, onMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;