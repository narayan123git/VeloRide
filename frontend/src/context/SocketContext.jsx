// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// Create socket outside component scope
const socket = io(import.meta.env.VITE_BASE_URL_1, {
  transports: ['websocket'],
});

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketRef = useRef(socket);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (event, payload) => {
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
