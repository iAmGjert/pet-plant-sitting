import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import MapMain from './Pages/MapMain';
import CalendarMain from './Pages/CalendarMain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  
}
 
const App: FC<Props> = () => {

  return ( 
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/map'
              element={<MapMain />}
            />
            <Route
              path='/calendar'
              element={<CalendarMain />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
 
export default App;
