import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import PrimaryButton from '../Buttons/PrimaryButton';
import ModalLayout from './ModalLayout';

const Content = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupEmailSentModal = () => {
  const dispatch = useDispatch();

  const closeSignupEmailSentModal = () => {
    dispatch(closeModal('SignupEmailSentModal'));
    dispatch(closeModal('AuthModal'));
  };

  return (
    <ModalLayout modalContent="SignupEmailSentModal">
      <Content>이메일 인증을 해주세요!</Content>
      <PrimaryButton onClick={closeSignupEmailSentModal} wFull>
        확인
      </PrimaryButton>
    </ModalLayout>
  );
};

export default SignupEmailSentModal;
