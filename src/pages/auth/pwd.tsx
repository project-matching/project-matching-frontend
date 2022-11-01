import PrimaryButton from '@/components/Common/Buttons//PrimaryButton';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { HTMLInputTypeAttribute, useState } from 'react';
import { TokenService } from 'src/services/TokenService';
import { UserService } from 'src/services/UserService';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: ${(props) => props.theme.sizes.xl};
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 3rem 0;
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
  display: none;
  line-height: 1.3;
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
  margin-bottom: 5px;
`;

const Form = styled.form`
  width: 300px;
  button {
    margin-top: 15px;
  }
`;

interface FormValueType {
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
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [inputValues, setInputValues] = useState<FormValueType>(initialValues);
  const router = useRouter();
  const { email, authToken } = router.query;

  const inputs: InputType[] = [
    {
      id: 0,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        '비밀번호는 8-20자의 영어 대소문자, 숫자, 특수문자로 이루어져야합니다.',
      pattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[- !@#$%^&*])[a-zA-Z0-9 -!@#$%^&*]{8,20}',
      label: 'Password',
      required: true,
      autoFocus: true,
    },
    {
      id: 1,
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

  const convertToRegEx = (pattern: string): RegExp => RegExp(pattern);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (
        authToken &&
        email &&
        typeof authToken === 'string' &&
        typeof email === 'string'
      ) {
        const target = e.target as typeof e.target & {
          password: { value: string };
        };

        const password = target.password.value;

        const { access, refresh, access_exp } =
          await UserService.confirmPassword({
            authToken,
            email,
            password,
          });

        TokenService.set(access);
        TokenService.setRefresh(refresh);
        TokenService.setExp(access_exp);

        // TODO: 변경 완료 시 어디로 이동...???
        router.push('/');
      }
    } catch (error: any) {
      router.push('/pwd-fail');
    }
  };

  return (
    <Wrapper>
      <Heading>비밀번호 변경</Heading>
      <Desc>새 비밀번호를 입력해주세요.</Desc>
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
          비밀번호 변경
        </PrimaryButton>
      </Form>
    </Wrapper>
  );
};

export default ChangePassword;
