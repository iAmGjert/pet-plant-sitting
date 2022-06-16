import React, { useRef } from 'react';
import { useSockets } from './context/socket.context';
const 


const Rooms = () => {

  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  const handleCreateRoom = () => {
    const roomName = newRoomRef.current.value || '';

    if (!String(roomName).trim()) {
      return;
    }

    socket.emit('CREATE_ROOM', { roomName });

    newRoomRef.current.value = '';
  };

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder='Room name' />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      {Object.keys(rooms).map((key) => {
        return <div key={key}>{rooms[key as keyof typeof rooms]['name']}</div>; 
      })}
    </nav>
  );
};

export default Rooms;
