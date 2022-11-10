import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import { HTMLInputTypeAttribute, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'src/redux/reducers/users';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: ${fontSize.m};
  margin-bottom: 20px;
  line-height: 1.5;

  b {
    color: ${colors.error};
    font-weight: ${fontWeight.bold};
  }
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: ${fontSize.sm};
  display: none;
  line-height: 1.3;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: ${fontSize.lg};
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
  confirmDelete: string;
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
  confirmDelete: '',
};

const MyAccountDelete = () => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState<FormValueType>(initialValues);

  const inputs: InputType[] = [
    {
      id: 0,
      name: 'confirmDelete',
      type: 'text',
      placeholder: '탈퇴하겠습니다.',
      errorMessage: '잘못 입력하셨습니다.',
      pattern: '탈퇴하겠습니다.',
      label: '',
      required: true,
      autoFocus: true,
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

    dispatch(deleteUser());

    setInputValues({
      confirmDelete: '',
    });
  };

  return (
    <Wrapper>
      <Title>정말 탈퇴하시겠습니까?</Title>
      <Desc>
        탈퇴하실 경우 같은 이메일 주소로 회원가입 하실 수 없습니다.<br></br>
        <b>회원탈퇴를 누를 경우 이 내용에 동의한 것으로 간주합니다.</b>
      </Desc>
      <Desc>탈퇴하시려면 &apos;탈퇴하겠습니다.&apos; 라고 입력해주세요.</Desc>
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
          회원 탈퇴
        </PrimaryButton>
      </Form>
    </Wrapper>
  );
};

export default MyAccountDelete;
