import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SignUpButton = styled(Button)({
    background: '#f16272',
    fontSize: '1.8rem',
    border: 0,
    borderRadius: 3,
    color: 'white',
    padding: '10px 40px',
    marginTop: '30px',
    '&:hover': {
      backgroundColor: '#ee3e52',
    },
  });

const SignUp = ({ history }) => {
    const { signup } =useContext(AuthContext);

    const handleSubmit = event =>{
        event.preventDefault();
        const { email, password } = event.target.elements;
        signup(email.value, password.value, history);
    };

    return(
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail Address</label>
            <input name="email" type="email" placeholder="email@gmail.com" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password"/>
          </div>
            <SignUpButton type="submit">SIGN UP</SignUpButton>
        </form>
        <Link to="/login">SignInへ戻る</Link>
        </div>
    )

}

export default SignUp;