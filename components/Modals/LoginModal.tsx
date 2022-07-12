import { Divider, Flex } from '@/styles/global';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from 'redux/reducers/auth';
import { closeModal } from 'redux/reducers/modals';
import PrimaryButton from '../Buttons/PrimaryButton';
import Logo from '../Common/Logo';

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
const Body = styled.div`
  margin: 20px 45px;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: 16px;
`;

const Form = styled.form`
  button {
    margin-top: 15px;
  }
`;

const A = styled.a`
  font-weight: bold;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 10px;
  align-items: center;
  margin: 10px 0;
`;

const Span = styled.div`
  font-size: ${(props) => props.theme.sizes.sm};
`;

const StatusContainer = styled.div`
  margin: 20px 0 10px 0;
`;

const LoginModal = () => {
  const [IsSigninForm, setSigninForm] = useState(true);
  const dispatch = useDispatch();

  const submitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    dispatch(
      signin({
        email,
        password,
      })
    );

    dispatch(closeModal('LoginModal'));
  };

  const submitSignUp = () => {};

  return (
    <Container>
      <Head>
        <div>
          <Logo />
        </div>
        <A onClick={() => dispatch(closeModal('LoginModal'))}>X</A>
      </Head>
      {IsSigninForm ? (
        <Body>
          <Form onSubmit={submitLogin}>
            <Input type="email" name="email" placeholder="Email" required />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <PrimaryButton type="submit" wFull>
              Sign in
            </PrimaryButton>
          </Form>
          <Grid>
            <Divider />
            <Span>OR</Span>
            <Divider />
          </Grid>
          <PrimaryButton wFull>Google</PrimaryButton>

          <Flex justifyCenter itemsCenter>
            <StatusContainer>
              Don&apos;t have any account?{' '}
              <A onClick={() => setSigninForm(false)}>Sign up</A>
            </StatusContainer>
          </Flex>
        </Body>
      ) : (
        <Body>
          <Form onSubmit={submitSignUp}>
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />

            <PrimaryButton type="submit" wFull>
              Sign up
            </PrimaryButton>
          </Form>
          <Flex justifyCenter itemsCenter>
            <StatusContainer>
              Have an account?{' '}
              <A onClick={() => setSigninForm(true)}>Sign in</A>
            </StatusContainer>
          </Flex>
        </Body>
      )}
    </Container>
  );
};

export default LoginModal;
