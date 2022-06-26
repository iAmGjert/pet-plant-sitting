import React from 'react';
import { useAppSelector } from '../state/hooks';
import { useNavigate } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  const navigate = useNavigate();
  const currUser = useAppSelector((state) => state.userProfile.value);
  if (currUser.name || currUser.username) {
    navigate('/');
  }
  return (
    <div>
      <Oval height='500' width='500' color='grey' ariaLabel='loading' />
    </div>
  );
};

export default Loading;
