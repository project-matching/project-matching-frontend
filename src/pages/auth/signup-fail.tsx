import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import SignupEmailSentModal from '@/components/Modals/SignupEmailSentModal';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
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
  margin: 7rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ErrorMsg = styled.span`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
`;

const Fail = () => {
  const router = useRouter();
  const { email } = router.query;
  const isOpen = useAppSelector((state) => state.modal.SignupEmailSentModal);
  const dispatch = useDispatch();
  const [ErrMsg, setErrMsg] = useState('');

  const reissueEmail = async () => {
    try {
      if (email && typeof email === 'string') {
        const isEmailSent = await UserService.reissueEmailAuthToken({ email });
        isEmailSent && dispatch(openModal('SignupEmailSentModal'));
      }
    } catch (error: any) {
      if (
        error?.response?.data?.error?.code ===
        'ALREADY_AUTHENTICATED_AUTH_TOKEN_EXCEPTION'
      ) {
        setErrMsg('이미 회원가입한 이메일 주소입니다.');
      }
    }
  };

  return (
    <>
      {isOpen && <SignupEmailSentModal />}
      <Wrapper>
        <Heading>이메일 인증 유효기간이 만료되었습니다.</Heading>
        <Desc>이메일 전송을 다시 시도해주세요.</Desc>
        <ButtonContainer>
          <PrimaryButton onClick={reissueEmail}>
            이메일 재전송하기
          </PrimaryButton>
          <Link href="/">
            <SecondaryButton>메인 화면으로 이동하기</SecondaryButton>
          </Link>
        </ButtonContainer>
        {ErrMsg && <ErrorMsg>{ErrMsg}</ErrorMsg>}
      </Wrapper>
    </>
  );
};

export default Fail;
