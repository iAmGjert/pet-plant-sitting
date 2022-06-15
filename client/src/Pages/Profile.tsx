import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../state/hooks';

const Profile = () => {
  const currUser = useAppSelector((state) => state.userProfile.value);
  console.log(currUser);
  return <div>User: {currUser.name}</div>;
};

export default Profile;
