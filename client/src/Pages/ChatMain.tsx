import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../state/hooks';
import Chat from '../Components/Chat/Chat';
import '../App.css';

const socket = io(`${process.env.CLIENT_URL}:4000`);

const ChatMain = () => {
  const [showChat, setShowChat] = useState(false);
  const currUser = useAppSelector((state) => state.userProfile.value);
  console.log(currUser);

  const joinRoom = () => {
    if (currUser.name !== '') {
      socket.emit('join_room', 'chat');
      setShowChat(true);
    }
  };
  return (
    <div className="chat-main">
      {!showChat ? (
        <div>
          <button onClick={joinRoom}>Join the Chat</button>
        </div>
      ) : (  
        <Chat socket={socket} currUser={currUser.name}/>
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


