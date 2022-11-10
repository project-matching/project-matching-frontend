import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { HTMLInputTypeAttribute, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from 'src/redux/reducers/auth';
import { convertToRegEx } from 'src/utils/common';
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
  display: none;
  line-height: 1.3;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: ${fontSize.lg};
  &:invalid ~ span {
    display: block;
  }
  /* &:invalid {
    display: block;
    border: 1px solid red;
    border-radius: 3px;
  } */
`;

const InputContainer = styled.div`
  margin-bottom: 5px;
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

const ModalFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusContainer = styled.div`
  margin: 20px 0 10px 0;
  font-size: ${fontSize.sm};
`;

interface SigninFormProps {
  setAuthForm: (_: AuthFormTypes) => void;
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
  autoFocus: boolean;
}

const initialValues: FormValueType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = ({ setAuthForm }: SigninFormProps) => {
  const [inputValues, setInputValues] = useState<FormValueType>(initialValues);
  const dispatch = useDispatch();

  const inputs: InputType[] = [
    {
      id: 0,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      label: 'Name',
      errorMessage:
        '이름은 3자 이상 10자 이하의 한글, 영어 대소문자, 숫자로 이루어져야 하며 특수문자를 포함하지 않아야 합니다.',
      pattern: '^[a-zA-Z가-힣0-9]{3,10}$',
      required: true,
      autoFocus: true,
    },
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: '올바른 이메일 형식이어야 합니다.',
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
      label: 'Email',
      required: true,
      autoFocus: false,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        '비밀번호는 8-20자의 영어 대소문자, 숫자, 특수문자로 이루어져야합니다.',
      pattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[- !~@#$%^&*])[a-zA-Z0-9 -~!@#$%^&*]{8,20}',
      label: 'Password',
      required: true,
      autoFocus: false,
    },
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      label: 'Confirm Password',
      errorMessage: '비밀번호와 동일해야 합니다.',
      pattern: `^${inputValues.password}$`,
      required: true,
      autoFocus: false,
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

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;

    dispatch(
      signup({
        name,
        email,
        password,
      })
    );
  };

  return (
    <div>
      <Content>
        <Title>회원가입</Title>
      </Content>
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
            autoFocus,
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
                autoFocus={autoFocus}
              />
              {convertToRegEx(pattern).test(inputValues[name]) ||
              inputValues[name] === '' ? null : (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              )}
            </InputContainer>
          )
        )}

        <PrimaryButton type="submit" wFull>
          회원가입
        </PrimaryButton>
      </Form>
      <ModalFoot>
        <StatusContainer>
          계정이 있나요?{' '}
          <Link onClick={() => setAuthForm('signin')}>로그인</Link>
        </StatusContainer>
      </ModalFoot>
    </div>
  );
};

export default SignupForm;
