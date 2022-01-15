import React,{ useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
    const { login } = useContext(AuthContext);
    
    const handleSubmit = event =>{
        event.preventDefault();
        const { email, password } = event.target.elements;
        login(email.value, password.value, history);
    }
};

export { Login }