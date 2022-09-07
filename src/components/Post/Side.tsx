import styled from '@emotion/styled';
import { FC } from 'react';
import useBookmark from 'src/hooks/useBookmark';
import Title from '../auth/Title';

const Wrapper = styled.div`
  width: 20%;
  position: fixed;
  right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  background-color: #4242;

  h1 {
    font-size: 20px;
    margin: 5px 0;
  }

  button {
    border: 0;
    outline: 0;
    padding: 5px;
    cursor: pointer;
    &:hover {
    background-color: gray;
    }
  }
`;

const PeriodRow = styled.div`
`

const MemberRow = styled.div`
  display: flex;
  flex-direction: column;

  
  span {
    width: 90%;
  }
`;

const MemberDetail = styled.div`
  display: flex;
  justify-content: space-evenly;

  .leader {
    color: #ff0000;
  }
`;

const TechRow = styled.div`
  margin: 10px 0;
`;

const ButtonRows = styled.div`
  position: fixed;
  width: 20%;
  right: 5%;
  bottom: 10%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border: 0;
    outline: 0;
    padding: 5px;
    margin: 5% 0;
    cursor: pointer;
    width: 100%;
    &:hover {
    background-color: gray;
    }
  }
`;

interface IUser {
  name: string;
  no: number;
  register: boolean;
}

interface IPosition {
  positionName: string,
  projectPositionNo: number,
  userDto: IUser | null
}

interface Idata {
  applicationStatus: boolean,
  bookmark: boolean,
  currentPeople: number,
  endDate: string,
  introduction: string,
  maxPeople: number,
  name: string,
  projectNo: number,
  projectPositionDetailDtoList: IPosition[],
  startDate: string,
  state: boolean,
  technicalStackList: string[]
}

interface Props {
  data: Idata,
  isRegister: boolean,
  isParticipant: boolean,
}

const Side: FC<Props> = ({ data, isRegister, isParticipant }) => {
  const { bookmark, toggleBookmark } = useBookmark();

  return (
    <Wrapper>
      <Title title="Project Detail" />
      <PeriodRow>
        <h1>Period</h1>
        <div>{data?.startDate} ~ {data?.endDate}</div>
      </PeriodRow>
      <MemberRow>
        <h1>Current Members({data.currentPeople} / {data.maxPeople}) </h1>
        {data.projectPositionDetailDtoList.map(member => {
          if (!member.userDto) return null;
          return (
            <MemberDetail key={member.userDto.name}>
              <span>{member.positionName}</span>
              <span>{member.userDto.name} </span>
              {member.userDto.register && <span className="leader">(Leader)</span>}
            </MemberDetail>
          )
        })}
      </MemberRow>
      <TechRow>
        <h1>Tech Stacks</h1>
        {data.technicalStackList.map(stack => {
          return (
            <div key={stack}>{stack}</div>
          )
        })}
      </TechRow>
      <button onClick={() => {toggleBookmark(data.projectNo)}} disabled={bookmark}>Bookmark</button>
      <ButtonRows>
        {isRegister ? 
        <>
          <button>모집완료</button>
          <button>수정하기</button>
          <button>신청자 관리</button>
        </>
        :
        isParticipant ? 
        <button>탈퇴하기</button>
        : null
        }
        
      </ButtonRows>
    </Wrapper>
  );
};

export default Side;
