import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginComp from './components/login/LoginComp';
import User from './pages/user/User';
import TodoProvider from './context/TodoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <LoginComp /> } />
        <Route path="/users" element={ <TodoProvider><User /></TodoProvider> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
