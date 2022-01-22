import React from 'react';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase.js";
import { collection, getDocs, onSnapshot, querySnapshot } from '../firebase/firestore';


export const Title =({}) =>{
    const [ projectTitles, setProjectTitles ] = useState([]);

    useEffect(() => {
        const projectCollectionRef = collection( db, 'project1');
        console.log(projectCollectionRef);
    }, []);
    
    //表示させる動作
    // const handleSubmit = async ( event ) =>{
    //     event.preventDefault();
    //     const { projectTitle } = event.target.elements;
    //     console.log( projectTitle.value );
    //     const usersCollectionRef = collection( db, 'project1');
    //     const documentRef = await addDoc( userCollectionRef, {
            
    //     });
    
    
    //getDocsでクエリーの実行 doc.data()を配列にするためにforEachではなくmapを使用する。上記で配列としてprojectNamesに保存をおこなった。idを含むオブジェクト。
    // getDocs(projectCollectionRef).then((querySnapshot) => {
    //   console.log(querySnapshot);
    // });
    // getDocs(projectCollectionRef).then((querySnapshot) =>{ querySnapshot.docs.forEach((doc) => console.log(doc))})
    // console.log(projectCollectionRef);
    // }, []);


    // const [titleText, setTitleText] = useState('');
    // const onChangeTitleText = (event) => setTitleText(event.target.value);
    // var titleText1 = db.doc('projectName').getDocument();
    return(
        <>
        <div>
        {/* <form onSubmit = {handleSubmit}>
        <label for="title" className='labelTitleInput'>
        <input name="projectTitle"
        type= "text"
        placeholder="Projcet Title" 
        className="titleInput"
        // value={titleText} 
        // onChange={onChangeTitleText}
        />            
        </label>
        <div>{projectTitles.map((projectTitle) => (
        <div key={projectTitle.id}>{projectTitle.colorMode}</div>
         ))}
        </div>
        <button type="submit" class="button">確定</button>
        </form> */}
        </div>
        </>
        
    )
}