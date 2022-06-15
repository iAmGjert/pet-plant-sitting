import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './state/store';
import { Provider } from 'react-redux';
import TopNavBar from './Components/TopNavBar/TopNavBar';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TopNavBar />
      <App />
      <BottomNavBar />
    </Provider>
  </React.StrictMode>
);
