import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LandingPageMain from './Pages/LandingPageMain';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import CalendarMain from './Pages/CalendarMain';
import CommunityEvents from './Pages/CommunityEventsMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './Pages/Profile';
import axios from 'axios';
import {
  setUser,
  setUsers,
} from './state/features/userProfile/userProfileSlice';
import { setJobs } from './state/features/jobs/jobSlice';
import { setPetPlants } from './state/features/petPlant/petPlantSlice';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { mapActions } from './state/features/map/mapSlice';
import JobsMain from './Pages/JobsMain';
// import JobCreation from './Pages/JobCreation';
import ChatMain from './Pages/ChatMain';

import TopNavBar from './Components/TopNavBar/TopNavBar';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import Loading from './Pages/Loading';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get('/auth/login/success');
    dispatch(setUser(user.data.user));
    // console.log(user, 'LOGIN USER/userProfile state is set');
  };
  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');
    dispatch(setJobs(jobs.data));
  };
  const getUsers = async () => {
    const users = await axios.get('api/users/all');
    dispatch(setUsers(users.data));
  };
  const getPetPlants = async () => {
    const petPlants = await axios.get('api/pets_plants/all');
    dispatch(setPetPlants(petPlants.data));
  };
  const getEvents = async () => {
    const events = await axios.get('/api/events/all');
    dispatch(mapActions.setEvents(events.data));
  };

  useEffect(() => {
    getUser();
    getJobs();
    getUsers();
    getPetPlants();
    getEvents();
  }, []);

  return (
    <BrowserRouter>
      <TopNavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landingpage' element={<LandingPageMain />} />
        <Route path='/map' element={<MapMain />} />
        <Route path='/events' element={<CommunityEvents />} />
        <Route path='/calendar' element={<CalendarMain />} />
        <Route path='/jobs' element={<JobsMain />} />
        {/* <Route path='/createjob' element={<JobCreation />} /> */}
        <Route path='/chat' element={<ChatMain />} />
      </Routes>
      <BottomNavBar />
    </BrowserRouter>
  );
};

export default App;
