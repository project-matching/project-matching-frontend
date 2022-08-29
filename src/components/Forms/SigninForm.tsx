import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signin } from 'src/redux/reducers/auth';
import { setSigninErrorMsg } from 'src/redux/reducers/components/validation';
import { Divider, Flex } from 'src/styles/global';
import OAuthButton from '../Buttons/OAuthButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import { AuthFormTypes } from '../Modals/AuthModal';

const Content = styled.div`
  padding: 0 0 20px;
  text-align: center;
  font-size: ${(props) => props.theme.sizes.sm};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: ${(props) => props.theme.sizes.lg};
  font-weight: bold;
  padding-bottom: 10px;
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
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
  font-size: ${(props) => props.theme.sizes.sm};
  margin-bottom: 10px;
  text-align: center;
`;

const ModalFoot = styled.div`
  margin: 20px 0 10px 0;
`;

interface SigninFormProps {
  setAuthForm: (_: AuthFormTypes) => void;
}

interface FormValueType {
  email: string;
  password: string;
}

interface InputType {
  id: number;
  name: keyof FormValueType;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  autoFocus: boolean;
}

const inputs: InputType[] = [
  {
    id: 0,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    autoFocus: true,
  },
  {
    id: 1,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    autoFocus: false,
  },
];

const SigninForm = ({ setAuthForm }: SigninFormProps) => {
  const { signinErrorMsg } = useAppSelector((state) => state.validation);
  const dispatch = useDispatch();

  const submitSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    if (email === '') {
      dispatch(setSigninErrorMsg('email'));
    } else if (password === '') {
      dispatch(setSigninErrorMsg('password'));
    } else {
      dispatch(
        signin({
          email,
          password,
        })
      );
    }
  };

  const authProviders = [
    {
      id: 0,
      serviceProvider: 'google',
      content: 'Google 계정으로 로그인',
    },
    {
      id: 1,
      serviceProvider: 'github',
      content: 'Github 계정으로 로그인',
    },
  ];

  const connectOAuth = (serviceProvider: string) => () => {
    const width = 500;
    const height = 500;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const title = `${serviceProvider} 소셜 로그인`;
    window.open(
      `/api/v1/oauth2/authorization/${serviceProvider}`,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <>
      <Content>
        <H1>로그인</H1>
      </Content>
      <Form onSubmit={submitSignin}>
        {inputs.map(({ id, ...props }) => (
          <Input key={id} {...props} />
        ))}
        <PrimaryButton type="submit" wFull>
          로그인
        </PrimaryButton>
      </Form>
      {signinErrorMsg && <ErrorMessage>{signinErrorMsg}</ErrorMessage>}
      <Grid>
        <Divider />
        <Span>OR</Span>
        <Divider />
      </Grid>

      {authProviders.map(({ id, serviceProvider, ...props }) => (
        <OAuthButton
          key={id}
          serviceProvider={serviceProvider}
          {...props}
          onClick={connectOAuth(serviceProvider)}
        />
      ))}

      <Flex justifyCenter itemsCenter>
        <ModalFoot>
          <StatusContainer>
            계정이 없나요? <A onClick={() => setAuthForm('signup')}>회원가입</A>
          </StatusContainer>
          <StatusContainer>
            비밀번호를 잊으셨나요?{' '}
            <A onClick={() => setAuthForm('changePassword')}>비밀번호 찾기</A>
          </StatusContainer>
        </ModalFoot>
      </Flex>
    </>
  );
};

export default SigninForm;
