import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

//認証に必要なものの集約

const AuthContext = React.createContext()
//Contextによって、データをpropを通してではない方法で渡す。
const AuthProvider = ( { children }) => {
    const [currentUser, setCurrentUser] =useState(null);
    const navigate = useNavigate();
//カスタムhookはcompornentのrender前に呼び出す

//認証情報の更新
    const signup = async ( email, password ) =>{
        //try 例外が発生する可能性のある処理
        try{
            await auth.createUserWithEmailAndPassword( email, password );
            auth.onAuthStateChanged( user => setCurrentUser(user));
            navigate('/');
        }
        //catch 例外が発生した場合の処理
        catch( error ) {
            alert( error );
        }
    }

//ログイン
    const login = async ( email, password ) =>{
        try{
            await auth.signInWithEmailAndPassword( email,password );
            auth.onAuthStateChanged( user => setCurrentUser( user ));
            navigate('/');
            // history.push("/");
        } catch( error ){
            // alert( error );
            console.log( error );
        }
    }

//関数の実行タイミングをReactのレンダリング後まで遅らせるhook
useEffect(() =>{
    auth.onAuthStateChanged( setCurrentUser );
}, []);

return(
    <AuthContext.Provider value={{ signup, login, currentUser}}>
        {children}
    </AuthContext.Provider>
)

}

export {AuthContext, AuthProvider}
