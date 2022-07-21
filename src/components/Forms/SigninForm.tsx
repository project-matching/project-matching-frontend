import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signin } from 'src/redux/reducers/auth';
import { setSigninErrorMsg } from 'src/redux/reducers/validation';
import { Divider, Flex } from 'src/styles/global';
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

  return (
    <Body>
      <Form onSubmit={submit}>
        {inputs.map(({ id, ...props }) => (
          <Input key={id} {...props} />
        ))}
        <PrimaryButton type="submit" wFull>
          Sign in
        </PrimaryButton>
      </Form>
      {signinErrorMsg && <ErrorMessage>{signinErrorMsg}</ErrorMessage>}
      <Grid>
        <Divider />
        <Span>OR</Span>
        <Divider />
      </Grid>
      <PrimaryButton wFull>Google</PrimaryButton>
      <PrimaryButton wFull>Github</PrimaryButton>

      <Flex justifyCenter itemsCenter>
        <StatusContainer>
          Don&apos;t have any account?{' '}
          <A onClick={() => setSigninForm(false)}>Sign up</A>
        </StatusContainer>
      </Flex>
    </Body>
  );
};

export default SigninForm;
