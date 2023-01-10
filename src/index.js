import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationContextProvider } from './context/Notification/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
