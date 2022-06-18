// import { Server, Socket } from 'socket.io';

// const rooms: Record<string, { name: string }> = {};

// const socket = ({ io }: { io: Server }) => {
//   console.log('Sockets enabled');

//   io.on('connection', (socket: Socket) => {
//     console.log(`User connected ${socket.id}`);

//     socket.on('CREATE_ROOM', ({roomName}) => {
      
//       rooms[roomName] = {
//         name: roomName
//       };
  
//       socket.join(roomName);
  
//       socket.broadcast.emit('ROOMS', rooms);

//       socket.emit('ROOMS', rooms);

//       socket.emit('JOINED_ROOM', roomName);
//     });


//   });
// };

// export default socket;
