import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const LoginButton = styled(Button)`
  &&& {
    padding: 10px 40px;
    margintop: 30px;
    font-size: 1.8rem;
    background: #3636b3;
    color: white;
    :hover& {
      background-color: #000066;
    }
  }
  //MUIのCCSSに上書きしたい際は&&&{}
`;

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

const Form = styled.div`
  text-align: left;
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 4vh;
  margin-top: 1vh;
  padding: 0.5vh;
  background-color: var(--cl--gray);
`;

const ButtonBox = styled.div`
  text-align: center;
  padding: 5vh 0;
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
          <Form>
            <span>Email</span>
            <Input name="email" type="email" placeholder="email@gmail.com" />
          </Form>
          <Form>
            <span>Password</span>
            <Input name="password" type="password" placeholder="Password" />
          </Form>
          <ButtonBox>
            <LoginButton variant="outlined" disableElevation type="submit">
              LOG IN
            </LoginButton>
          </ButtonBox>
        </form>
        <Link to="/signup" className="auth-link">
          <Text>SignUp</Text>
        </Link>
        <Button onClick={OnClickGuestButton}>
          ゲストユーザーとしてログイン
        </Button>
      </Container>
    </Wrapper>
  );
};

export { Login };
