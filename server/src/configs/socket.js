import { Server } from 'socket.io';

export let onlineUsers = [];

export const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('login', (userId) => {
      onlineUsers.push({
        userId: userId,
        socketId: socket.id,
      });

      console.log(`User ${userId} is logged in`);
    });

    socket.on('disconnect', () => {
      const user = onlineUsers.find((user) => user.socketId == socket.id);
      onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);

      console.log(`User ${user.userId} is logged out`);
    });
  });
};
