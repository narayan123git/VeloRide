// Example: src/socket/captainSocket.js
import { io } from "socket.io-client";

const captainSocket = io(`${import.meta.env.VITE_BASE_URL_1}/captain`, {
  transports: ['websocket'],
  withCredentials: true
});

export default captainSocket;