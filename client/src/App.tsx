import React, { FC, useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LandingPageMain from './Pages/LandingPageMain';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import CalendarMain from './Pages/CalendarMain';
import CommunityEvents from './Pages/CommunityEventsMain';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { setEvents } from './state/features/events/eventsSlice';
import JobsMain from './Pages/JobsMain';
// import JobCreation from './Pages/JobCreation';
import ChatMain from './Pages/ChatMain';
import Register from './Components/LoginForm/Register';
import TopNavBar from './Components/TopNavBar/TopNavBar';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import Loading from './Pages/Loading';
import InfoMain from './Pages/InfoMain';
// import EditEvent from './Components/CommunityEvents/EditEvent';
import Error from './Pages/Error';
import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const ThemeContext = createContext(null);

const socket = io(`${process.env.CLIENT_URL}`); // take out for production


const App: FC<Props> = () => {
  const currUser = useAppSelector((state) => state.userProfile.value);
  const [theme, setTheme] = useState(
    currUser && currUser.theme !== null ? `${currUser.theme}` : null
  );

  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get('/auth/login/success');
    dispatch(setUser(user.data.user));
    //console.log(user.data.user);
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
    dispatch(setEvents(events.data));
  };
  const toggleTheme = () => {
    setTheme((curr: string) => (curr === null ? 'dark' : null));
    axios.patch(`/api/users/${currUser.id}`, {
      theme: currUser.theme === null ? 'dark' : null,
    });
  };

  useEffect(() => {
    getUser();
    getJobs();
    getUsers();
    getPetPlants();
    getEvents();
  }, []);

  useEffect(() => {
    setTheme(currUser.theme);
  }, [currUser]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className='App' id={theme}>
        <BrowserRouter>
          <TopNavBar toggleTheme={toggleTheme} theme={theme} />
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
            <Route path='/chat' element={<ChatMain socket={socket}/>} />
            <Route path='/info' element={<InfoMain />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <BottomNavBar theme={theme} />
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
