import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Chat from '../Components/Chat/Chat';
import ClientList from '../Components/Chat/ClientList';
import ApplicantList from '../Components/Chat/ApplicantList';
import '../App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeView, getReceivedMessages, getSentMessages, getUsersOnline } from '../state/features/chat/chatSlice';

interface userOnline {
  userId: number,
  name: string,
  socketId: string
}


const socket = io(`${process.env.CLIENT_URL}:4000`);

// {transports: ['websocket']}

const ChatMain = () => {   
  
  const currUser = useAppSelector((state) => state.userProfile.value);
  const view = useAppSelector((state) => state.chat.view);
  // const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (socket.id !== undefined) {
      socket.emit('addUser', {
        userId: currUser.id,
        name: currUser.name
      }); 
    }

    socket.on('getUsers', (onlineUsers: userOnline[]) => {
      dispatch(getUsersOnline(onlineUsers));
    });

  }, [currUser]);

  // const joinRoom = () => {
  //   if (currUser.name !== '') {
  //     socket.emit('join_room', 'chat');
  //     // setShowChat(true);
  //   }
  // };

  return (
    <div className="chat-main">
      {
        view === 'usersOnline' ? (
          <div>
            <ClientList />
            <ApplicantList />
          </div>
        )
          :
          <Chat socket={socket} />
      }
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


