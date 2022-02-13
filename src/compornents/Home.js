import React, { useState, useContext, useEffect } from 'react';
import { Header } from './Header';
import { Title } from './Title';
import { Deadline } from './Deadline';
import { ItemList } from './ItemList';
import { SaveBtn } from './SaveBtn';
import { AuthContext } from '../auth/AuthProvider';
import { collection, DocumentSnapshot, getDoc, getDocs, setDoc, QuerySnapshot, doc } from 'firebase/firestore';
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase/firebase";

// const [inputTitle, setInputTitle] = useState('');
export const Home = ({}) => {
  const [ projects, setProjects ] = useState([]);
  const [ title, setTitle ] = useState('');
  //ここでtitleとfirebaseのtitleを繋げて変数
  const { currentUser } = useContext(AuthContext);
  
  const docId = Math.random().toString(32).substring(2);
  //dicIdをこちらで作成する
  //Titleに文字を入力
  const onChangeTitle = ( event ) => setTitle(event.target.value);
  const onClickAdd = () =>{
    alert(title)
    console.log(db.collection('projects'));
    db.collection('projects').doc(docId).set({
      uid: currentUser.uid,
      title, cmykText, tonboText, dataTypeText,imgTypeText
    })
    // const addTitle = [firebasのtitle]
    };

    const [ cmykText, setCmykText ] = useState('');
    const onChangeCmykText = (event) => setCmykText(event.target.value);
    const [ tonboText, setTonboText ] = useState('');
    const onChangeTonboText = (event) => setTonboText(event.target.value);
    const [ dataTypeText, setDataTypeText ] = useState('');
    const onChangeDataTypeText = (event) => setDataTypeText(event.target.value);
    const [ imgTypeText, setImgTypeText ] = useState('');
    const onChangeImgTypeText = (event) => setImgTypeText(event.target.value);
    const [ cmykInput, setcmykInput ] =useState('');
    const [ tonboInput, setTonboInput ] =useState('');
    const [ dataTypeInput, setDataTypeInput ] =useState('');
    const [ imgTypeInput, setImgTypeInput ] =useState('');
    const checkInput = (cmykInput, tonboInput, dataTypeInput,imgTypeInput) =>{
      if (cmykInput, tonboInput, dataTypeInput,imgTypeInput) {
        alert('チェック完了です。入稿してください。');
      }
    }
    
    
  useEffect(() =>{
  const projectsCollectionRef = collection(db, 'projects');
  console.log(projectsCollectionRef);
  //dbのコレクションを参照。
  getDocs(projectsCollectionRef).then((querySnapShot) =>{
    console.log(querySnapShot);
    //querySnapShotの中にあるdocsは配列。forEachで展開してdocを取り出す。doc.data()でdocのなかでネストになっているdataを取り出す。
    querySnapShot.docs.forEach((doc) => console.log(doc.data()));
    //getDocsでコレクションの取得 querySnapShotのdocはarray
    setProjects(querySnapShot.docs.map((doc) => ({...doc.data(), id: doc.id })));
    //forEachは戻り値がないので,useStateで定義したprojectsに保存するにはmapを使用する。idをdoc.data()とマージ。これでprojectsというarrのなかでfirestoreの値が取得。
    });
  }, []);
    
    return(
        <>
        <wrapper>
        <Header
        projects = {projects}/>
        <Title
        title={title}
        onChangeTitle={onChangeTitle}
        />
        {/* <Title 変数名 ={}で変数を渡す/> */}
        <Deadline/>
        <ItemList
        onChangeCmykText={onChangeCmykText}
        onChangeTonboText={onChangeTonboText}
        onChangeDataTypeText={onChangeDataTypeText}
        onChangeImgTypeText={onChangeImgTypeText}
        cmykInput={cmykInput}
        tonboInput={tonboInput}
        dataTypeInput={dataTypeInput}
        imgTypeInput={imgTypeInput}
        checkInput={checkInput}
        />
        <SaveBtn
        onClickAdd={onClickAdd}
        />
        </wrapper>
        </>
    )}

