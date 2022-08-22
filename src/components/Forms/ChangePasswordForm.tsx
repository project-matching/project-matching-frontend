import styled from '@emotion/styled';
import { HTMLInputTypeAttribute, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { patchPassword } from 'src/redux/reducers/users';
import PrimaryButton from '../Buttons/PrimaryButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
  display: none;
  line-height: 1.3;
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.sizes.m};
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: 16px;
  &:invalid ~ span {
    display: block;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 5px;
`;

const Form = styled.form`
  width: 300px;
  button {
    margin-top: 15px;
  }
`;

const SubmitErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
  line-height: 1.3;
`;

interface FormValueType {
  oldPassword: string;
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
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const errorPassword = useAppSelector((state) => state.user.errorUserPassword);
  const [inputValues, setInputValues] = useState<FormValueType>(initialValues);

  const inputs: InputType[] = [
    {
      id: 0,
      name: 'oldPassword',
      type: 'password',
      placeholder: '현재 비밀번호',
      errorMessage:
        '비밀번호는 8-20자의 영어 대소문자, 숫자, 특수문자로 이루어져야합니다.',
      pattern: '[a-zA-Z0-9 -!@#$%^&*]+',
      label: '현재 비밀번호',
      required: true,
      autoFocus: true,
    },
    {
      id: 1,
      name: 'password',
      type: 'password',
      placeholder: '새 비밀번호',
      errorMessage:
        '비밀번호는 8-20자의 영어 대소문자, 숫자, 특수문자로 이루어져야합니다.',
      pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[- !@#$%^&*])[a-zA-Z0-9 -!@#$%^&*]{8,20}`,
      label: '새 비밀번호',
      required: true,
      autoFocus: false,
    },
    {
      id: 2,
      name: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호 확인',
      label: '비밀번호 확인',
      errorMessage: '새 비밀번호와 동일해야 합니다.',
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

  const convertToRegEx = (pattern: string): RegExp => RegExp(pattern);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      patchPassword({
        oldPassword: inputValues.oldPassword,
        newPassword: inputValues.password,
      })
    );

    setInputValues({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={submit}>
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
            label,
          }) => (
            <InputContainer key={id}>
              <Label>{label}</Label>
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
          비밀번호 변경
        </PrimaryButton>
      </Form>
      {errorPassword && (
        <SubmitErrorMessage>올바르지 않은 비밀번호입니다.</SubmitErrorMessage>
      )}
    </Wrapper>
  );
};

export default ChangePasswordForm;
