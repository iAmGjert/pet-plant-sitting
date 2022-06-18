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
import { setUser, setUsers } from './state/features/userProfile/userProfileSlice';
import { setJobs } from './state/features/jobs/jobSlice';
import { setPetPlants } from './state/features/petPlant/petPlantSlice';
import { useAppDispatch, useAppSelector } from './state/hooks';
import JobsMain from './Pages/JobsMain';
<<<<<<< HEAD
import JobCreation from './Pages/JobCreation';
import ChatMain from './Pages/ChatMain';

=======
import TopNavBar from './Components/TopNavBar/TopNavBar';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
>>>>>>> e62bd2b9d08195e2d77691f6b47e0d7615d006b3
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get(
      '/auth/login/success'
    );
    dispatch(setUser(user.data.user));
    // console.log(user, 'LOGIN USER/userProfile state is set');
  };
  const getJobs = async () => {
    const jobs = await axios.get(
      '/api/jobs/all'
    );
    dispatch(setJobs(jobs.data));
  };
  const getUsers = async () =>{
    const users = await axios.get('api/users/all');
    dispatch(setUsers(users.data));
  };
  const getPetPlants = async () =>{
    const petPlants = await axios.get('api/pets_plants/all');
    dispatch(setPetPlants(petPlants.data));
  };
  useEffect(() => {
    getUser();
    getJobs();
    getUsers();
    getPetPlants();
  }, []);

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<MapMain />} />
        <Route path='/events' element={<CommunityEvents />} />
        <Route path='/calendar' element={<CalendarMain />} />
        <Route path='/jobs' element={<JobsMain />} />
        <Route path='/createjob' element={<JobCreation />} />
        <Route path='/chat' element={<ChatMain />} />
      </Routes>
    </BrowserRouter>
=======
    <div>      
      <BrowserRouter>
        <TopNavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/map' element={<MapMain />} />
          <Route path='/events' element={<CommunityEvents />} />
          <Route path='/calendar' element={<CalendarMain />} />
          <Route path='/jobs' element={<JobsMain />} />
        </Routes>
        <BottomNavBar />
      </BrowserRouter>
    </div>
>>>>>>> e62bd2b9d08195e2d77691f6b47e0d7615d006b3
  );
};

export default App;
