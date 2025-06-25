// Example: src/socket/userSocket.js
import { io } from "socket.io-client";

const userSocket = io(`${import.meta.env.VITE_BASE_URL_1}/user`, {
  transports: ['websocket'],
  withCredentials: true // if you use cookies for auth
});

export default userSocket;