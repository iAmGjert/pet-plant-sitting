import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import MapMain from './Pages/MapMain';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
 
export default App;
