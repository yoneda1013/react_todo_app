import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";

const AuthContext = React.createContext()


const AuthProvider = ( { children }) => {
    const [currentUser, setCurrentUser] =useState(null);

//認証情報の更新
    const signup = async ( email, password, history ) =>{
        try{
            await auth.createUserWithEmailAndPassword( email, password);
            auth.onAuthStateChanged( user => setCurrentUser(user));
            history.push("/");
        }
        catch( error ) {
            alert( error );
        }
    }

//ログイン
const login = async ( email, password, history ) =>{
    try{
        await auth.signInWithEmailAndPassword( email,password );
        auth.onAuthStateChanged( user => setCurrentUser( user ));
        history.puch( "/" );
    } catch( error ){
        alert( error );
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
