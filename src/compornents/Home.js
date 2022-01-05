import React, { useState, useContext, useEffect } from 'react';
import { Header } from './Header';
import { Title } from './Title';
import { Deadline } from './Deadline';
import { ItemList } from './ItemList';

// const [inputTitle, setInputTitle] = useState('');

export const Home = ({}) => {
    return(
        <>
        <Header/>
        <Title/>
        <Deadline/>
        <ItemList/>
        </>
    )}

