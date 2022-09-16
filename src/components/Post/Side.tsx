import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import useBookmark from 'src/hooks/useBookmark';
import { ProjectService } from '../../services/ProjectService';
import Title from '../auth/Title';
import { Backdrop } from '../Modals/Backdrop';
import RejectModal from '../Modals/RejectModal';
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
  bottom: 7%;

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

const ManagingPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  height: 90%;
  background-color: white;
  overflow: auto;
`

const ApplicantBox = styled.article`
  width: 90%;
  height: 30%;
  background-color: #4242;
  margin: 2% 0;
  padding: 2%;
`

const ApplicantInfoSection = styled.section`
  display: flex;

  aside {
    margin-right: 5%;
  }
  main {
    margin-right: 15%;
  }
`

const ApplicantInfoItem = styled.div`
  width: 100%;
  margin-bottom: 10%;

  .title {
    font-weight: 900;
    margin-right: 5%;
  }
`;

const ApplicantMotive = styled.div`
  span {
    font-weight: 900;
  }
`

const ApplicantButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0 2%;
    border: 0;
    outline: 0;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }
`

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

interface applicant {
  motive: string,
  positionName: string,
  projectParticipateNo: number,
  technicalStackList: string[],
  userName: string,
}

interface Props {
  data: Idata,
  isRegister: boolean,
  isParticipant: boolean,
}

const Side: FC<Props> = ({ data, isRegister, isParticipant }) => {
  const { bookmark, toggleBookmark } = useBookmark();
  const [onModal, setOnModal] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<applicant[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  //const isRejected = useAppSelector(state => state.modal.RejectModal);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const clickHandler = async (e: React.BaseSyntheticEvent) => {
    const id = e.target.id;

    if (id === "manage") {
      if (!applicants.length) {
        const response = await ProjectService.getProjectApplicants(router.query.id as string);
        setApplicants(response.content);
      }
      setOnModal(true);
    }

    if (id === "modification") {
      const { id } = router.query;
      router.push(`${id}/modification`);
      //console.log("handle fixing mode")
    }
  }

  const applicantButtonHandler = async (e: React.BaseSyntheticEvent, participantNo: number) => {
    const id = e.target.id;

    if (id === "allow") {
      const response = await ProjectService.allowProjectApplicant(participantNo);
      // 500 error?
      console.log(response);
    }

    if (id === "reject") {
      //dispatch(openModal("RejectModal"));
      setIsRejected(true);
      // use dispatch
    }
  }
// 신청자 관리 페이지 만들기 모달
// 추방 버튼 활성화
// 수정 페이지 만들기
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
              {isRegister && !member.userDto.register && <button>추방</button>}
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
      <ButtonRows onClick={clickHandler}>
        {isRegister ? 
        <>
          <button id="complete">모집완료</button>
          <button id="modification">수정하기</button>
          <button id="manage">신청자 관리</button>
        </>
        :
        isParticipant ? 
        <button id="quit">탈퇴하기</button>
        : null
        }
      </ButtonRows>
      {onModal && 
        <Backdrop>
          {!isRejected ?
          <ManagingPage>
            {applicants.map(applicant => {
              console.log(applicant);
              return(
                <ApplicantBox key={applicant.projectParticipateNo}>
                  <ApplicantInfoSection>
                    <aside>{applicant.userName}</aside>
                    <main className="info">
                      <ApplicantInfoItem>
                        <span className="title">포지션</span>
                        <span>{applicant.positionName}</span>
                      </ApplicantInfoItem>
                      <ApplicantInfoItem>
                        <span className="title">기술 스택</span> 
                        <span>{applicant.technicalStackList}</span>
                      </ApplicantInfoItem>
                      <ApplicantInfoItem>
                        <span className="title">깃허브 주소</span> 
                        <span>not allowed</span>
                      </ApplicantInfoItem>
                    </main>
                    <ApplicantMotive>
                      <span>신청 동기</span>
                      <div>{applicant.motive}</div>
                    </ApplicantMotive>
                  </ApplicantInfoSection>
                  <ApplicantButtonRow onClick={(e) => applicantButtonHandler(e, applicant.projectParticipateNo)}>
                    <button id="allow">수락하기</button>
                    <button id="reject">거절하기</button>
                  </ApplicantButtonRow>
                </ApplicantBox>
              );
            })}
          </ManagingPage>
          :
          <RejectModal title="프로젝트 참가 신청 거절" onReject={() => {console.log("hi")}} onCancel={() => {setIsRejected(false)}}/>
          }
        </Backdrop>
      }
    </Wrapper>
  );
};

export default Side;
