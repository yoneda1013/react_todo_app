import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const SignUpButton = styled(Button)`
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
  padding-top: 100px;
  background: #e8e7e7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin: 10em 0;
  width: 350px;
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
  margin: 10px 0 7px 0;
`;

const Form = styled.div`
  text-align: left;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 30px;
  margin-top: 10px;
  padding: 5px;
  background-color: var(--cl--gray);
`;

const ButtonBox = styled.div`
  text-align: center;
  padding: 40px 0;
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
          <Form>
            <span>E-mail</span>
            <Input name="email" type="email" placeholder="email@gmail.com" />
          </Form>
          <Form>
            <span>Password</span>
            <Input name="password" type="password" placeholder="Password" />
          </Form>
          <ButtonBox>
            <SignUpButton type="submit">SIGN UP</SignUpButton>
          </ButtonBox>
        </form>
        <Link to="/login" className="auth-link">
          <Text>SignInへ戻る</Text>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
