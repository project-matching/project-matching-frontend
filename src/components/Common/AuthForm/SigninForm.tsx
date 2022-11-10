import OAuthButton from '@/components/Common/Buttons/OAuthButton';
import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signin, signinOAuth, TokenType } from 'src/redux/reducers/auth';
import { setSigninErrorMsg } from 'src/redux/reducers/components/validation';
import { Divider } from 'src/styles/global';
import { AuthFormTypes } from '../Modals/AuthModal';

const Content = styled.div`
  padding: 0 0 20px;
  text-align: center;
  font-size: ${fontSize.sm};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold};
  padding-bottom: 10px;
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: ${fontSize.sm};
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: ${fontSize.lg};
`;

const Form = styled.form`
  button {
    margin-top: 15px;
  }
`;

const Link = styled.a`
  font-weight: ${fontWeight.bold};
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
  font-size: ${fontSize.sm};
`;

const StatusContainer = styled.div`
  font-size: ${fontSize.sm};
  margin-bottom: 10px;
  text-align: center;
`;

const ModalFoot = styled.div`
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

interface SigninFormProps {
  setAuthForm: (_: AuthFormTypes) => void;
}

interface FormValueType {
  email: string;
  password: string;
}

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

    window.parentCallback = ({ access, refresh, access_exp }: TokenType) => {
      dispatch(signinOAuth({ access, refresh, access_exp: +access_exp }));
    };
  };

  return (
    <div>
      <Content>
        <Title>로그인</Title>
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

      <ModalFoot>
        <StatusContainer>
          계정이 없나요?{' '}
          <Link onClick={() => setAuthForm('signup')}>회원가입</Link>
        </StatusContainer>
        <StatusContainer>
          비밀번호를 잊으셨나요?{' '}
          <Link onClick={() => setAuthForm('changePassword')}>
            비밀번호 찾기
          </Link>
        </StatusContainer>
      </ModalFoot>
    </div>
  );
};

export default SigninForm;