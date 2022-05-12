import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

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

const Wrapper = styled.div`
  height: 100vh;
  padding-top: 10vh;
  background: #e8e7e7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vh;
  margin: 10em 0;
  width: 40vh;
  color: #2c2c2f;
  background: #ffffff;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: var(--font--size--h1);
`;

const Text = styled.p`
  text-align: center;
  font-size: var(--font--size--p);
  margin: 1.5vh 0 1vh 0;
`;

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  const OnClickGuestButton = (event) => {
    event.preventDefault();
    login("guest@example.com", "guest1", history);
  };

  return (
    <Wrapper>
      <Container>
        <Title>LOGIN</Title>
        <Text>
          登録したアドレス、
          <br />
          パスワードを入力してください。
        </Text>
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
        <Button onClick={OnClickGuestButton}>
          ゲストユーザーとしてログイン
        </Button>
      </Container>
    </Wrapper>
  );
};

export { Login };
