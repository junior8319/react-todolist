import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginComp from './components/login/LoginComp';
import User from './pages/user/User';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <LoginComp /> } />
        <Route path="/users" element={ <User /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
