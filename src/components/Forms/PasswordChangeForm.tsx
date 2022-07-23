import { Flex } from '@/styles/global';
import styled from '@emotion/styled';
import React, { useState } from 'react';
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

const Span = styled.span`
  b {
    color: red;
    font-weight: bold;
  }
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

const StatusContainer = styled.div`
  font-size: ${(props) => props.theme.sizes.sm};
  margin-bottom: 10px;
  text-align: center;
`;

const ModalFoot = styled.div`
  margin: 20px 0 10px 0;
`;

interface PasswordChangeFormProps {
  setAuthForm: (_: AuthFormTypes) => void;
}

const PasswordChangeForm = ({ setAuthForm }: PasswordChangeFormProps) => {
  const [submit, setSubmit] = useState(false);

  const submitChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 비밀번호 변경을 위한 이메일 전송 로직

    if (!submit) {
      setSubmit(true);
    }
  };

  return (
    <>
      <Content>
        <H1>비밀번호 변경</H1>
        {submit ? (
          <Span>
            <b>아래 주소로 이메일이 전송되었습니다.</b>
          </Span>
        ) : (
          <Span>
            회원님의 <b>이메일 주소</b>를 적어주세요.
          </Span>
        )}
      </Content>
      <Form onSubmit={submitChangePassword}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          autoFocus
          required
        />
        {submit ? (
          <PrimaryButton wFull>재전송</PrimaryButton>
        ) : (
          <PrimaryButton wFull>변경 요청</PrimaryButton>
        )}
      </Form>
      <Flex justifyCenter itemsCenter>
        <ModalFoot>
          <StatusContainer>
            계정이 있나요? <A onClick={() => setAuthForm('signin')}>로그인</A>
          </StatusContainer>
          <StatusContainer>
            계정이 없나요? <A onClick={() => setAuthForm('signup')}>회원가입</A>
          </StatusContainer>
        </ModalFoot>
      </Flex>
    </>
  );
};

export default PasswordChangeForm;
