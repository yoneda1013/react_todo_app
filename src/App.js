import './App.css';
// import Calender from './compornents/Calender'
import { useState, useEffect } from 'react';
import { Home } from './compornents/Home';
import { AuthProvider } from './auth/AuthProvider';
import { Login } from "./auth/Login";
import  SignUp  from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { List } from './compornents/List';
import { db } from "./firebase/firebase";

import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Route, Routes } from 'react-router-dom';



export const App =() =>{
  const [ projects, setProjects ] = useState([]);
  

  useEffect(() =>{
  const projectsCollectionRef = collection(db, 'projects');
  // console.log(projectsCollectionRef);
  //dbのコレクションを参照。
  getDocs(projectsCollectionRef).then((querySnapShot) =>{
    // console.log(querySnapShot);
    //querySnapShotの中にあるdocsは配列。forEachで展開してdocを取り出す。doc.data()でdocのなかでネストになっているdataを取り出す。
    // querySnapShot.docs.forEach((doc) => console.log(doc.data()));
    //getDocsでコレクションの取得 querySnapShotのdocはarray
    setProjects(querySnapShot.docs.map((doc) => ({...doc.data(), id: doc.id })));
    //forEachは戻り値がないので,useStateで定義したprojectsに保存するにはmapを使用する。idをdoc.data()とマージ。これでprojectsというarrのなかでfirestoreの値が取得。
    });
  }, []);
  
  return (
  <>
    {/* <BrowserRouter> */}
    <AuthProvider>
    <Routes>
      {/* <Route path="/" element ={<PrivateRoute><Home/></PrivateRoute>} /> */}
      <Route path="/" element={<PrivateRoute/>} >
        <Route path="/" element={<Home/>} />
        <Route path="/list" element={<List projects = {projects} setProjects={setProjects}/>} />
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>  
    </AuthProvider>
    {/* </BrowserRouter> */}
  </>
  );
  };
