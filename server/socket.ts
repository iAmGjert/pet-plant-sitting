const { Server, Socket } = require('socket.io');
require('dotenv').config();

// const { socket } = require('./socket');

const io = new Server(4000, {
  cors: {
    origin: `${process.env.CLIENT_URL}:5000`, //remove for deployment
    credentials: true,
  },
});

interface onlineUser {
  userId: number,
  name: string,
  socketId: string
}

let onlineUsers: onlineUser[] = [];

const addUser = (userId: number, name: string, socketId: string) => {
  if (userId) {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        name,
        socketId
      });
    }
  }
};

const getUser = (userId: number) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};


io.on('connection', (socket: typeof Socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('addUser', async (data: onlineUser) => {
    await addUser(data.userId, data.name, socket.id);
    io.emit('getUsers', onlineUsers);
  });

  // socket.on('join_room', (data: string) => {
  //   socket.join(data);
  //   console.log(`User with ID: ${socket.id} joined room ${data}`);
  // });

  // socket.on('send_message', (data: any) => {
  //   socket.to(data.room).emit('receive_message', data);
  // });

  socket.on('send_message', ({senderId, receiverId, text, conversationId}: {senderId: number, receiverId: number, text: string, conversationId: number}) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit('receive_message', {
      senderId,
      text,
      conversationId,
      name: user?.name
    });
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('User Disconnected', socket.id);
    io.emit('getUsers', onlineUsers);
  });
});
