import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import logo from '../assets/logo.png';

const Main = styled.main`
  min-height: 100vh;
`;

const Container = styled.div`
  width: 358px;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  @media (max-width: 414px) {
    width: 90%;
  }
`;

const Logo = styled.img``;

const LoginHeader = styled.div`
  height: 81px;
  background-color: #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
    <Main>
      <Container>
        <LoginHeader>
          <Logo src={logo} alt="" />
        </LoginHeader>
        <LoginForm />
      </Container>
    </Main>
  );
};
export default Login;
