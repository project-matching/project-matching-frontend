import styled from '@emotion/styled';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import { PositionService } from 'src/services/PositionService';
import { ProjectService } from 'src/services/ProjectService';
import ModalLayout from './ModalLayout';

const Header = styled.header`
  font-weight: 900;
  margin-bottom: 5%;
`;

const UserInfo = styled.section`
  font-weight: 800;
  margin-bottom: 5%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 90%;

  span {
    margin-bottom: 3%;
  }
`;

const ReasonTextArea = styled.textarea`
  width: 110%
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 5% 0;
`;

interface Props {
  title: string;
  participateNo: number;
  isExpulsion: boolean;
}

export const RejectModal: FC<Props> = ({ title, participateNo, isExpulsion = false }) => {
  const [reason, setReason] = useState<string>("");
  const dispatch = useDispatch();

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  }

  const clickCancelBtn = () => {
    dispatch(closeModal("RejectModal"));
  }

  const clickRejectBtn = async () => {
    !isExpulsion ?
    await ProjectService.rejectProjectApplicant(participateNo, { reason }) :
    await PositionService.expelPosition(participateNo, reason);

    dispatch(closeModal("RejectModal"));
  }

  return (
    <ModalLayout modalContent="RejectModal">
      <Header>
        {title}
      </Header>
      <UserInfo>
        유저이름
      </UserInfo>
      <Main>
        <span>거절 사유</span>
        <ReasonTextArea rows={15} value={reason} onChange={handleTextArea}/>
      </Main>
      <ButtonsRow>
        <button onClick={clickRejectBtn}>거절하기</button>
        <button onClick={clickCancelBtn}>취소</button>
      </ButtonsRow>
    </ModalLayout>
  )
}

export default RejectModal;
