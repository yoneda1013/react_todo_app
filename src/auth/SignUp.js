import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

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

const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Sign Up</Title>
        <Text>
          登録がまだの方は下記フォームに
          <br />
          必要事項を入力してください。
        </Text>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <span>E-mail</span>
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
      </Container>
    </Wrapper>
  );
};

export default SignUp;
