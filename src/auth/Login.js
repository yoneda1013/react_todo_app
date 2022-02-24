import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const LoginButton = styled(Button)({
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

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <div className="wrapper">
      <div className="auth-container">
        <h1>LOGIN</h1>
        <p>登録したアドレス、パスワードを入力してください。</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <span>Email</span>
            <input name="email" type="email" placeholder="email@gmail.com" />
          </div>
          <div className="auth-form">
            <span>Password</span>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <div className="auth-btn">
            <LoginButton variant="outlined" disableElevation type="submit">
              LOG IN
            </LoginButton>
          </div>
        </form>
        <Link to="/signup" className="auth-link">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export { Login };
