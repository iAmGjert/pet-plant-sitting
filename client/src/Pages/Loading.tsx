import React, { useEffect } from 'react';
import { useAppSelector } from '../state/hooks';
import { useNavigate } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  const navigate = useNavigate();
  const currUser = useAppSelector((state) => state.userProfile.value);
  useEffect(() => {
    if (currUser.name || currUser.username) {
      navigate('/landingPage');
    }
  }, [currUser.name, currUser.username, navigate]);
  
  return (
    <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Oval height='200' width='200' ariaLabel='loading' />
    </div>
  );
};

export default Loading;
