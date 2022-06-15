import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: FC<Props> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
