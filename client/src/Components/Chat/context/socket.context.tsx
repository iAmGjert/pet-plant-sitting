import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  roomId?: string;
  rooms: object;

}

const socket = io(`${process.env.CLIENT_URL}:4000`);

const SocketContext = createContext<Context>({ 
  socket, 
  setUsername: () => false,
  rooms: {},
});

const SocketsProvider = (props: any) => {

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  
  socket.on('ROOMS', (value) => {
    setRooms(value); 
  });

  return (
    <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId }} {...props} />
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
