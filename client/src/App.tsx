import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import CalendarMain from './Pages/CalendarMain';
import CommunityEvents from './Pages/CommunityEventsMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './Pages/Profile';
import axios from 'axios';
import { setUser } from './state/features/userProfile/userProfileSlice';
import { setJobs } from './state/features/jobs/jobSlice';
import { useAppDispatch, useAppSelector } from './state/hooks';
import JobsMain from './Pages/JobsMain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get(
      `${process.env.CLIENT_URL}:${process.env.PORT}/auth/login/success`
    );
    dispatch(setUser(user.data.user));
  };
  const getJobs = async () => {
    const jobs = await axios.get(
      `${process.env.CLIENT_URL}:${process.env.PORT}/api/jobs/all`
    );
    dispatch(setJobs(jobs.data));
  };
  useEffect(() => {
    getUser();
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<MapMain />} />
        <Route path='/events' element={<CommunityEvents />} />
        <Route path='/calendar' element={<CalendarMain />} />
        <Route path='/jobs' element={<JobsMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
