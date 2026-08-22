const { Server } = require('socket.io');

let io = null;

const initIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);

    // Join order room for order tracking
    socket.on('joinOrderRoom', (orderId) => {
      const room = `order_${orderId}`;
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Leave order room
    socket.on('leaveOrderRoom', (orderId) => {
      const room = `order_${orderId}`;
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔥 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    console.warn('Socket.IO not initialized yet');
  }
  return io;
};

module.exports = { initIO, getIO };
