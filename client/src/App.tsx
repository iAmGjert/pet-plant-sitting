import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import CalendarMain from './Pages/CalendarMain';
import CommunityEvents from './Pages/CommunityEventsMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobsMain from './Pages/JobsMain';
import JobCreation from './Pages/JobCreation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<MapMain />} />
        <Route path='/events' element={<CommunityEvents />} />
        <Route path='/calendar' element={<CalendarMain />} />
        <Route path='/jobs' element={<JobsMain />} />
        <Route path='/createjob' element={<JobCreation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
