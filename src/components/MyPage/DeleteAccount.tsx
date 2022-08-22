import styled from '@emotion/styled';
import { HTMLInputTypeAttribute, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'src/redux/reducers/users';
import PrimaryButton from '../Buttons/PrimaryButton';

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
  font-size: ${(props) => props.theme.sizes.m};
  margin-bottom: 20px;

  b {
    color: ${(props) => props.theme.colors.error};
    font-weight: bold;
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
  display: none;
  line-height: 1.3;
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

const DeleteAccount = () => {
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
        탈퇴하시려면 &apos;<b>탈퇴하겠습니다.</b>&apos; 라고 입력해주세요
      </Desc>
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

export default DeleteAccount;
