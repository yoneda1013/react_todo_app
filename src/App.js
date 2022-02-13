import './App.css';
// import Calender from './compornents/Calender'
import { useState, useEffect } from 'react';
import { Home } from './compornents/Home';
import { AuthProvider } from './auth/AuthProvider';
import { Login } from "./auth/Login";
import  SignUp  from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { List } from './compornents/List';

import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Route, Routes } from 'react-router-dom';

export const App =() =>{
  
  return (
  <>
    {/* <BrowserRouter> */}
    <AuthProvider>
    <Routes>
      {/* <Route path="/" element ={<PrivateRoute><Home/></PrivateRoute>} /> */}
      <Route path="/" element={<PrivateRoute/>} >
        <Route path="/" element={<Home/>} />
        <Route path="/list" element={<List/>} />
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>  
    </AuthProvider>
    {/* </BrowserRouter> */}
  </>
  );
  };
