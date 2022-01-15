import './App.css';
// import Calender from './compornents/Calender'
import { useState } from 'react';
import { Home } from './compornents/Home';
import { Router } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { Login } from "./auth/Login";
import  SignUp  from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";


export const App =() =>{
  return (
  <>
  <AuthProvider>
    <Router>
      <switch>
      <PrivateRoute exact path="/" component={Home} />
      <Router exact path="/login" component={Login} />
      <Router exact path="/signup" component={SignUp} />
      </switch>
    </Router>  
  </AuthProvider>
  </>
  );
  };
