import styled from '@emotion/styled';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import { PositionService } from 'src/services/PositionService';
import { ProjectService } from 'src/services/ProjectService';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import ModalLayout from './ModalLayout';

const Header = styled.header`
  font-weight: 900;
  margin-bottom: 5%;
`;

const UserInfo = styled.h3`
  margin-bottom: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;

  > label {
    font-size: ${(props) => props.theme.sizes.m};
    margin-bottom: 10px;
  }

  span {
    margin-bottom: 3%;
  }
`;

const ReasonTextArea = styled.textarea`
  width: 100%;
  min-height: 35px;
  border: 1px solid #d4d4d4;
  padding: 10px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
  margin: 5% 0;
`;

interface Props {
  title: string;
  participateNo: number;
  isExpulsion: boolean;
  username: string;
}

export const RejectModal: FC<Props> = ({
  title,
  participateNo,
  isExpulsion = false,
  username,
}) => {
  const [reason, setReason] = useState<string>('');
  const dispatch = useDispatch();

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const clickCancelBtn = () => {
    dispatch(closeModal('RejectModal'));
  };

  const clickRejectBtn = async () => {
    !isExpulsion
      ? await ProjectService.rejectProjectApplicant(participateNo, { reason })
      : await PositionService.expelPosition(participateNo, reason);

    dispatch(closeModal('RejectModal'));
  };

  return (
    <ModalLayout modalContent="RejectModal">
      <Header>{title}</Header>
      <UserInfo>유저 이름: {username}</UserInfo>
      <Main>
        <label htmlFor="reason">{isExpulsion ? '추방' : '거절'}사유</label>
        <ReasonTextArea
          name="reason"
          rows={15}
          value={reason}
          onChange={handleTextArea}
        />
      </Main>
      <ButtonsRow>
        <PrimaryButton wFull onClick={clickRejectBtn}>
          {isExpulsion ? '추방' : '거절'}하기
        </PrimaryButton>
        <SecondaryButton wFull onClick={clickCancelBtn}>
          취소
        </SecondaryButton>
      </ButtonsRow>
    </ModalLayout>
  );
};

export default RejectModal;
