import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/modals';
import { removeSigninErrorMsg } from 'src/redux/reducers/validation';
import Logo from '../Common/Logo';
import SigninForm from '../Forms/SigninForm';
import SignupForm from '../Forms/SignupForm';

const Container = styled.div`
  width: 350px;
  background-color: white;
  z-index: 1000;
`;
const Head = styled.div`
  margin: 20px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const A = styled.a`
  font-weight: bold;
  cursor: pointer;
`;

const LoginModal = () => {
  const [IsSigninForm, setSigninForm] = useState(true);
  const dispatch = useDispatch();

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const closeLoginModal = () => {
    dispatch(removeSigninErrorMsg());
    dispatch(closeModal('LoginModal'));
  };

  return (
    <Container>
      <Head>
        <div>
          <Logo />
        </div>
        <A onClick={closeLoginModal}>X</A>
      </Head>
      {IsSigninForm ? (
        <SigninForm setSigninForm={setSigninForm} />
      ) : (
        <SignupForm submitSignup={submitSignup} setSigninForm={setSigninForm} />
      )}
    </Container>
  );
};

export default LoginModal;
