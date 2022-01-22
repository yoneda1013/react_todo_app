import './App.css';
// import Calender from './compornents/Calender'
import { useState, useEffect } from 'react';
import { Home } from './compornents/Home';
import { Router, useResolvedPath } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { Login } from "./auth/Login";
import  SignUp  from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { db } from "./firebase/firebase.js"
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App =() =>{
  const [ projects, setProjects ] = useState([]);
  //firestoreのdbから取得したデータをprojectsに保存する。
  const projectsCollectionRef = collection( db, 'projects')
  //dbのコレクションを参照。
  useEffect(() =>{

  }, []);

  // useEffect(() => {
  //   const projectCollectionRef = collection(db, 'projectName');
  //   // getDocs(projectCollectionRef).then((QuerySnapshot) =>{ QuerySnapshot.docs.forEach((doc) => console.log(doc.data()));})
  //   getDocs(projectCollectionRef).then((QuerySnapshot) =>{
  //     setProjectNames(QuerySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //   });
  //   //getDocsでクエリーの実行 doc.data()を配列にするためにforEachではなくmapを使用する。上記で配列としてprojectNamesに保存をおこなった。idを含むオブジェクト。
  //   // getDocs(projectCollectionRef).then((querySnapshot) => {
  //   //   console.log(querySnapshot);
  //   // });
  //   // getDocs(projectCollectionRef).then((querySnapshot) =>{ querySnapshot.docs.forEach((doc) => console.log(doc))})
  //   // console.log(projectCollectionRef);
  // }, []);

  return (
  <>
  {/* <Home/> */}
  <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<PrivateRoute/>} >
        <Route exact path="/" element={<Home/>} />
      </Route>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  </AuthProvider>
  </>
  );
  };
