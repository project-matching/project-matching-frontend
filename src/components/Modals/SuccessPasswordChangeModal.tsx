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

const SuccessPasswordChangeModal = () => {
  const dispatch = useDispatch();

  const closeSuccessPasswordChange = () => {
    dispatch(closeModal('SuccessPasswordChangeModal'));
  };

  return (
    <ModalLayout modalContent="SuccessPasswordChangeModal">
      <Content>비밀번호가 변경되었습니다.</Content>
      <PrimaryButton onClick={closeSuccessPasswordChange} wFull>
        확인
      </PrimaryButton>
    </ModalLayout>
  );
};

export default SuccessPasswordChangeModal;
