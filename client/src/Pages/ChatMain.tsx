import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Chat from '../Components/Chat/Chat';
import ChatList from '../Components/Chat/ChatList';
import PendingClientList from '../Components/Chat/PendingClientList';
import ApplicantList from '../Components/Chat/ApplicantList';
import AcceptedApplicantList from '../Components/Chat/AcceptedApplicantList';
import ConfirmedClientList from '../Components/Chat/ConfirmedClientList';
import '../css/App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeView, getReceivedMessages, getSentMessages, getUsersOnline } from '../state/features/chat/chatSlice';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

interface userOnline {
  userId: number,
  name: string,
  socketId: string
}


// const socket = io(`${process.env.CLIENT_URL}:4000`);

// {transports: ['websocket']}

const ChatMain = ({ socket }) => {   
  
  const currUser = useAppSelector((state) => state.userProfile.value);
  const dispatch = useAppDispatch();

  const view = useAppSelector((state) => state.chat.view);

  return (
    <div className="chat-main">
      {currUser.name === '' ? (
          <div className="chat-login"><b>Login to view available chats!</b></div>
          <Button>
              Login
          </Button>
      ) : (
        <ChatList socket={socket}/>
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


