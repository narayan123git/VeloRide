const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;
function SocketInitialization(server) {
  io = socketIo(server, {
    cors: {
      origin: '*', // Restrict in production!
      methods: ['GET', 'POST']
    }
  });

  // USER NAMESPACE
  const userNamespace = io.of('/user');
  userNamespace.on('connection', (socket) => {
    console.log('✅ [USER] New socket:', socket.id);

    socket.on('join', async (data) => {
      const { userId } = data;
      if (!userId) return;
      await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      console.log(`[USER] ${userId} joined with socket ${socket.id}`);
    });

    socket.on('disconnect', async () => {
      console.log(`❌ [USER] Socket disconnected: ${socket.id}`);
      // Optionally remove socketId from user in DB
    });
  });

  // CAPTAIN NAMESPACE
  const captainNamespace = io.of('/captain');
  captainNamespace.on('connection', (socket) => {
    console.log('✅ [CAPTAIN] New socket:', socket.id);

    socket.on('join', async (data) => {
      const { userId } = data;
      if (!userId) return;
      await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      console.log(`[CAPTAIN] ${userId} joined with socket ${socket.id}`);
    });

    socket.on('update-captain-location', async (data) => {
      const { userId, location } = data;
      if (!location.ltd || !location.lng) {
        return socket.emit('error', 'invalid location');
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.ltd]
        }
      });
    });

    socket.on('disconnect', async () => {
      console.log(`❌ [CAPTAIN] Socket disconnected: ${socket.id}`);
      // Optionally remove socketId from captain in DB
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket.IO not initialized!");
  return io;
}

// Send message to a specific socketId (namespace-aware)
function SocketSendMessageToSocketId(namespace,socketId, event, payload) {
  if (io && io.of(namespace) && socketId) {
    io.of(namespace).to(socketId).emit(event, payload);
    console.log(`📤 Sent ${event} via ${namespace} :${socketId}`);
  } else {
    console.warn(`⚠️ Socket ID not found`);
  }
}

module.exports = {
  SocketInitialization,
  SocketSendMessageToSocketId,
  getIO
};