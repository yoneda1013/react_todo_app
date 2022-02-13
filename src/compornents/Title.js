import React from 'react';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase.js";

// import { collection, getDocs, onSnapshot, querySnapshot } from '../firebase/firestore';


export const Title =({ title, onChangeTitle }) =>{

    return(
        <>
        <div>
        
        <p>
        </p>
        <form>
        <label for="projects" className='labelTitleInput'>
        <div className='conrainerTitleInput'>
        <input name="projects"
        type= "text"
        value= {title}
        onChange={onChangeTitle}
        placeholder="案件名を入力" 
        className="titleInput"
        />
        </div>
        </label>
        </form>
        </div>
        </>
        
    )
}