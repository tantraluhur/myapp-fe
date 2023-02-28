import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from 'react-toastify';

import 'react-custom-alert/dist/index.css'; // import css file from root.



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
  <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={1000} position="top-center"/>
      </BrowserRouter>
  </AuthProvider>
);
