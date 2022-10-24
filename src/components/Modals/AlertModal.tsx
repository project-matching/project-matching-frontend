import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import PrimaryButton from '../Buttons/PrimaryButton';
import ModalLayout from './ModalLayout';

interface Props {
  content: string;
}

const AlertModal = ({ content }: Props) => {
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(closeModal('AlertModal'));
  };

  return (
    <ModalLayout modalContent="AlertModal">
      <Content>{content}</Content>
      <PrimaryButton onClick={closeAlert} wFull>
        확인
      </PrimaryButton>
    </ModalLayout>
  );
};

export default AlertModal;

const Content = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
