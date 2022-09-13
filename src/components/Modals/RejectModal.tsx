import styled from '@emotion/styled';
import { ChangeEvent, FC, useState } from 'react';

const RejectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  height: 60%;
  background-color: #bfbfbf;
  padding: 5%;
`;

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
`

interface Props {
  title: string,
  onReject: any,
  onCancel: any
}

export const RejectModal: FC<Props> = ({title, onReject, onCancel}) => {
  const [reason, setReason] = useState<string>("");
  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  }
// participantNo 받아오기 이후 reject projectService.rejectProjectApplicant
  return (
    <RejectBox>
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
        <button>거절하기</button>
        <button onClick={onCancel}>취소</button>
      </ButtonsRow>
    </RejectBox>
  )
}

export default RejectModal;
