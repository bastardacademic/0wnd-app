import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

export function initSocket(server: HTTPServer) {
  if (!io) {
    io = new SocketIOServer(server, {
      cors: {
        origin: process.env.SOCKET_ORIGIN ?? '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      const groupRoom = socket.handshake.query.group;
      if (groupRoom) {
        socket.join(\group:\\);
      }

      socket.on('disconnect', () => {
        // cleanup if needed
      });
    });
  }

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
}