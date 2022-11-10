import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from 'src/redux/reducers/components/modals';
import { UserService } from 'src/services/UserService';
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

const Desc = styled.span`
  b {
    color: ${colors.error};
    font-weight: ${fontWeight.bold};
  }
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 5px 10px;
  width: 100%;
  font-size: ${fontSize.lg};
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

const StatusContainer = styled.div`
  font-size: ${fontSize.sm};
  margin-bottom: 10px;
  text-align: center;
`;

const ModalFoot = styled.div`
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ForgotPasswordrops {
  setAuthForm: (_: AuthFormTypes) => void;
}

const ForgotPasswordForm = ({ setAuthForm }: ForgotPasswordrops) => {
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
    <div>
      <Content>
        <Title>비밀번호 변경</Title>
        <Desc>
          회원가입 시 사용한 <b>이메일 주소</b>를 적어주세요.
        </Desc>
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
      <ModalFoot>
        <StatusContainer>
          계정이 있나요?{' '}
          <Link onClick={() => setAuthForm('signin')}>로그인</Link>
        </StatusContainer>
        <StatusContainer>
          계정이 없나요?{' '}
          <Link onClick={() => setAuthForm('signup')}>회원가입</Link>
        </StatusContainer>
      </ModalFoot>
    </div>
  );
};

export default ForgotPasswordForm;
