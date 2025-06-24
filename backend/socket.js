// Socket.js
const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;
function SocketInitialization(server) {
  io = socketIo(server, {
    cors: {
      origin: '*', // Allow all origins (you can restrict this later)
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('✅ New socket connected:', socket.id);

    socket.on('join', async (data) => {
      const { userId, userType } = data

      console.log('joined', data)

      if (!userId) {
        console.warn('⚠️ Missing userId in join payload');
        return;
      }
      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id })
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
      }
    })

    socket.on('update-captain-location', async (data) => {
      const { userId, location } = data
      if (!location.ltd || !location.lng) {
        return socket.emit('error', 'invalid location')
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.ltd] // [lng, lat]
        }
      });
    })
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
      // Remove from onlineUsers map
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket.IO not initialized!");
  return io;
}

// Send message to a specific socketId
function SocketSendMessageToSocketId(socketId, event, payload) {
  if (socketId && io) {
    io.to(socketId).emit(event, payload);
    console.log(`📤 Sent ${event} via ${socketId}`);
  } else {
    console.warn(`⚠️ Socket ID not found`);
  }
}

module.exports = {
  SocketInitialization,
  SocketSendMessageToSocketId,
  getIO
};
