import { Flex } from '@/styles/global';
import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute, useState } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';

const Body = styled.div`
  margin: 20px 45px;
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
  display: none;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: 16px;
  &:invalid ~ span {
    display: block;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
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

const StatusContainer = styled.div`
  margin: 20px 0 10px 0;
`;

interface SigninFormProps {
  submitSignup: (_: React.FormEvent<HTMLFormElement>) => void;
  setSigninForm: (_: boolean) => void;
}

interface FormValueType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputType {
  id: number;
  name: keyof FormValueType;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: string;
  required: boolean;
}

const initialValues: FormValueType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = ({ submitSignup, setSigninForm }: SigninFormProps) => {
  const [inputValues, setInputValues] = useState<FormValueType>(initialValues);

  const inputs: InputType[] = [
    {
      id: 0,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      label: 'Name',
      errorMessage: 'It should be a valid email address',
      pattern:
        "/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*$/",
      required: true,
    },
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address',
      pattern:
        "/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*$/",
      label: 'Email',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be more than 8-20 charactors and it should include at least 1 letter, 1 number, and 1 special charactor',
      pattern: '/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/i',

      label: 'Password',
      required: true,
    },
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      label: 'Confirm Password',
      errorMessage:
        'Password should be more than 8-20 charactors and it should include at least 1 letter, 1 number, and 1 special charactor',
      pattern: '/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/i',

      required: true,
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const inputName = target.getAttribute('name') as string;

    setInputValues({
      ...inputValues,
      [inputName]: target.value,
    });
  };

  return (
    <Body>
      <Form onSubmit={submitSignup}>
        {inputs.map(
          ({
            id,
            type,
            placeholder,
            name,
            errorMessage,
            required,
            pattern,
          }) => (
            <InputContainer key={id}>
              <Input
                name={name}
                type={type}
                placeholder={placeholder}
                value={inputValues[name]}
                onChange={onChange}
                required={required}
                pattern={pattern}
              />
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </InputContainer>
          )
        )}

        <PrimaryButton type="submit" wFull>
          Sign up
        </PrimaryButton>
      </Form>
      <Flex justifyCenter itemsCenter>
        <StatusContainer>
          Have an account? <A onClick={() => setSigninForm(true)}>Sign in</A>
        </StatusContainer>
      </Flex>
    </Body>
  );
};

export default SignupForm;
