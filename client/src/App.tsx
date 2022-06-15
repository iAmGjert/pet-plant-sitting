import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MapMain from './Pages/MapMain';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/map' element={<MapMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
