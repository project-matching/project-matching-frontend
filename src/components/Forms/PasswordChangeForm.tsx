import { Flex } from '@/styles/global';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from 'src/redux/reducers/components/modals';
import { UserService } from 'src/services/UserService';
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
  const dispatch = useDispatch();

  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value: string };
      };
      const email = target.email.value;

      const isEmailSent = await UserService.initPasswordRequest({ email });

      if (isEmailSent) {
        dispatch(closeModal('AuthModal'));
        dispatch(openModal('SignupEmailSentModal'));
      }
    } catch (error: any) {
      // TODO: 전송 실패 시??
    }
  };

  return (
    <>
      <Content>
        <H1>비밀번호 변경</H1>
        <Span>
          회원가입 시 사용한 <b>이메일 주소</b>를 적어주세요.
        </Span>
      </Content>
      <Form onSubmit={submitChangePassword}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          autoFocus
          required
        />
        <PrimaryButton wFull>이메일 전송</PrimaryButton>
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
