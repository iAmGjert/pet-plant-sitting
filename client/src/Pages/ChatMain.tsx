import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Chat from '../Components/Chat/Chat';
import PendingClientList from '../Components/Chat/PendingClientList';
import ApplicantList from '../Components/Chat/ApplicantList';
import AcceptedApplicantList from '../Components/Chat/AcceptedApplicantList';
import ConfirmedClientList from '../Components/Chat/ConfirmedClientList';
import '../css/App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeView, getReceivedMessages, getSentMessages, getUsersOnline } from '../state/features/chat/chatSlice';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

interface userOnline {
  userId: number,
  name: string,
  socketId: string
}


// const socket = io(`${process.env.CLIENT_URL}:4000`);

// {transports: ['websocket']}

const ChatMain = ({ socket }) => {   
  
  const currUser = useAppSelector((state) => state.userProfile.value);
  // const [view, setView] = useState(useAppSelector((state) => state.chat.view));
  // const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const dispatch = useAppDispatch();

  const view = useAppSelector((state) => state.chat.view);

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

  }, [socket.id]);

  // const joinRoom = () => {
  //   if (currUser.name !== '') {
  //     socket.emit('join_room', 'chat');
  //     // setShowChat(true);
  //   }
  // };

  return (
    <div className="chat-main">
      {/* <h1>Chat</h1> */}
      <h2>Chat</h2>   
      <DropdownButton as={ButtonGroup} title={view}>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="1">All</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="2">Pending Employers</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="3">Confirmed Employers</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="4">Applicants</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="5">Accepted Applicants</Dropdown.Item>
      </DropdownButton>
      {
        view === 'All' ? (
          <div>
            <PendingClientList />
            <ConfirmedClientList />
            <ApplicantList />
            <AcceptedApplicantList />
          </div>
        )
          : (
            view === 'Pending Clients' ? (
              <div>
                <PendingClientList />
              </div>
            )
              : (
                view === 'Confirmed Clients' ? (
                  <div>
                    <ConfirmedClientList />
                  </div>
                )
                  : (
                    view === 'Applicants' ? (
                      <div>
                        <ApplicantList />
                      </div>
                    )
                      : (
                        view === 'Accepted Applicants' ? (
                          <div>
                            <AcceptedApplicantList />
                          </div>
                        )
                          : (
                            <div>
                              {view === 'Chat' && <Chat socket={socket} />}
                            </div>
                          )
                      )
                  )
              )
          )
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


