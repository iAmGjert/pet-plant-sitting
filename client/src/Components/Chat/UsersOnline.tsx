import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../state/hooks';
import UserOnline from './UserOnline';



const UsersOnline = () => {
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const currUser = useAppSelector((state) => state.userProfile.value);

  // console.log(currUser);
  // console.log(usersOnline);

  return (
    <div>
      <h3>Users Who Are Online</h3>
      {usersOnline.filter((userOnline) => userOnline.userId !== currUser.id).map((userOnline) => <UserOnline key={userOnline.socketId} userOnline={userOnline} />)}
    </div>
  );
};

// 

export default UsersOnline;
