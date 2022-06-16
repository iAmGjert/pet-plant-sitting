import { Server, Socket } from 'socket.io';
import { nanoid } from 'nanoid';

const rooms: Record<string, { name: string }> = {};

const socket = ({ io }: { io: Server }) => {
  console.log('Sockets enabled');

  io.on('connection', (socket: Socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('CREATE_ROOM', ({roomName}) => {
      const roomId = nanoid();
      
      rooms[roomId] = {
        name: roomName
      };
  
      socket.join(roomId);
  
      socket.broadcast.emit('ROOMS', rooms);

      socket.emit('ROOMS', rooms);

      socket.emit('JOINED_ROOM', roomId);
    });


  });
};

export default socket;
