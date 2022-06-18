import { io } from 'socket.io-client';
import React, { useState } from 'react';
import Chat from '../Components/Chat/Chat';

const socket = io('http://localhost:4000');

console.log(socket);

const ChatMain = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };
  return (
    <div>
      {!showChat ? (
        <div>
          <h3>Join Chat</h3>
          <input 
            type="text" 
            placeholder="Enter Username" 
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input 
            type="text" 
            placeholder="Enter Room Name"
            onChange={(event) => {
              setRoom(event.target.value);
            }}  
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (  
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
};


export default ChatMain;

/*

import React, { useRef } from 'react';
import { useSockets } from '../Components/Chat/context/socket.context';

import Rooms from '../Components/Chat/Rooms';
import Messages from '../Components/Chat/Messages';

const ChatMain = () => {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);


  const handleSetUsername = () => {
    const value = usernameRef.current.value;

    if (!value) {
      return;
    }

    console.log(value);

    setUsername(value);

    localStorage.setItem('username', value);
  };

  return (
    <div>
      {socket.id}
      {!username && (
        <div className="usernameWrapper">
          <div className="usernameInner">
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleSetUsername}>START</button>  
          </div>
        </div>
      )}
      {username && (
        <>
          <div className="components ">
            <Rooms/>
            <Messages/>
          </div>
        </>
      )}
    </div>
  );
};

*/


