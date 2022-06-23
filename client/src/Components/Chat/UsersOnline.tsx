import React from 'react';
import { useAppSelector } from '../../state/hooks';



const UsersOnline = () => {
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);


  return (
    <div>
      <h3>Users Who Are Online</h3>
      <div>{usersOnline.map((userOnline) => <p key={userOnline.socketId}>{userOnline.name}</p>)}</div>
    </div>
  );
};

export default UsersOnline;