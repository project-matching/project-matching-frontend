import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signin, signinOAuth } from 'src/redux/reducers/auth';
import { setSigninErrorMsg } from 'src/redux/reducers/validation';
import { Divider, Flex } from 'src/styles/global';
import OAuthButton from '../Buttons/OAuthButton';
import PrimaryButton from '../Buttons/PrimaryButton';

const Body = styled.div`
  margin: 20px 45px;
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
  margin: 20px 0 10px 0;
  font-size: ${(props) => props.theme.sizes.sm};
`;

interface SigninFormProps {
  setSigninForm: (_: boolean) => void;
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

const SigninForm = ({ setSigninForm }: SigninFormProps) => {
  const { signinErrorMsg } = useAppSelector((state) => state.validation);
  const dispatch = useDispatch();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = externalPopup.location.href; // cross-origin의 경우 에러
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const token = searchParams.get('token');
      if (token) {
        externalPopup.close();
        // ERROR: CORS
        dispatch(signinOAuth(token));
      }
    }, 500);
  }, [externalPopup, dispatch]);

  const connectOAuth = (serviceProvider: string) => () => {
    const width = 500;
    const height = 500;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const title = `${serviceProvider} 소셜 로그인`;
    const popup = window.open(
      `http://localhost:8080/oauth2/authorization/${serviceProvider}`,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setExternalPopup(popup);
  };

  return (
    <Body>
      <Form onSubmit={submit}>
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
        <StatusContainer>
          계정이 없나요? <A onClick={() => setSigninForm(false)}>회원가입</A>
        </StatusContainer>
      </Flex>
    </Body>
  );
};

export default SigninForm;
