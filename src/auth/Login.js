import React,{ useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Login = ({ history }) => {
    const { login } = useContext(AuthContext);
    const handleSubmit = event =>{
        event.preventDefault();
        const { email, password } = event.target.elements;
        login(email.value, password.value, history);
    };


    return(
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input name="email" type="email" placehplder="Emial"/>
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Log in</button>
            </form>
            <Link to="/signup">SignUp</Link>
        </div>
    )
};

export { Login }