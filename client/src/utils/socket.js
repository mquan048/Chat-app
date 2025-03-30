import { io } from 'socket.io-client';

export default {
  socket: null,

  connect: function (userId) {
    this.socket = io(import.meta.env.VITE_SERVER_URL);
    this.socket.emit('login', userId);

    this.socket.on('disconnect', () => {
      this.socket = null;
    });
  },

  disconnect: function () {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },
};
