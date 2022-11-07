import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import ModalLayout from './ModalLayout';

const Content = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessDeleteUserModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const closeSuccessDeleteUser = () => {
    dispatch(closeModal('SuccessDeleteUserModal'));
    router.push('/');
  };

  return (
    <ModalLayout modalContent="SuccessDeleteUserModal">
      <Content>회원탈퇴했습니다.</Content>
      <PrimaryButton onClick={closeSuccessDeleteUser} wFull>
        확인
      </PrimaryButton>
    </ModalLayout>
  );
};

export default SuccessDeleteUserModal;
