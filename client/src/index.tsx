import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './state/store';
import { Provider } from 'react-redux';
import TopNavBar from './Components/TopNavBar/TopNavBar';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<<<<<<< HEAD
  <Provider store={store}>
    <TopNavBar />
    <App />
    <BottomNavBar />
  </Provider>
=======
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
>>>>>>> e62bd2b9d08195e2d77691f6b47e0d7615d006b3
);
