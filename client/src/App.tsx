import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './Pages/Profile';
import axios from 'axios';
import {
  setUser,
  changeName,
} from './state/features/userProfile/userProfileSlice';
import { useAppDispatch, useAppSelector } from './state/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get('http://localhost:5000/auth/login/success');
    dispatch(setUser(user.data.user));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<MapMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
