import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SignUpButton = styled(Button)({
  background: "#3636B3",
  fontSize: "1.8rem",
  border: 0,
  borderRadius: 3,
  color: "white",
  padding: "10px 40px",
  marginTop: "30px",
  "&:hover": {
    backgroundColor: "#000066",
  },
});

const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);
  //AuthContextからsingup関数を受け取る

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <div className="wrapper">
      <div className="auth-container">
        <h1>Sign Up</h1>
        <p>登録がまだの方は下記フォームに必要事項を入力してください。</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <span>E-mail Address</span>
            <input name="email" type="email" placeholder="email@gmail.com" />
          </div>
          <div className="auth-form">
            <span>Password</span>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <div className="auth-btn">
            <SignUpButton type="submit">SIGN UP</SignUpButton>
          </div>
        </form>
        <Link to="/login" className="auth-link">
          SignInへ戻る
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
