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

    socket.on('join',async (data)=>{
        const {userId,userType} = data

        console.log('joined',data)
        if(userType === 'user'){
            await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
        }else if(userType === 'captain'){
            await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
        }
    })

    socket.on('update-captain-location',async (data)=>{  
        const {userId,location} = data
        //perform validation here for location
        // if(!location || !location.ltd || !location.lng){
        //   return socket.emit('error','invalid location')
        // }
        if(!location.ltd || !location.lng){
            return socket.emit('error','invalid location')
        }
        await captainModel.findByIdAndUpdate(userId,{location:{
            ltd:location.ltd,
            lng:location.lng
        }})
    })
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
      // Remove from onlineUsers map
    });
  });
}

// Send message to a specific socketId
function SocketSendMessageToSocketId(socketId, event, payload) {
  if (socketId && io) {
    io.to(socketId).emit(event, payload);
    console.log(`📤 Sent ${event} to ${id} via ${socketId}`);
  } else {
    console.warn(`⚠️ Socket ID for ${id} not found`);
  }
}

module.exports = {
  SocketInitialization,
  SocketSendMessageToSocketId,
};
