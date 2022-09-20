import Title from '@/components/auth/Title';
import CommentInput from '@/components/Inputs/CommentInput';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import Position from '@/components/Post/Position';
import Side from '@/components/Post/Side';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';
import Comment from '../../components/Post/Comment';
import { CommentService } from '../../services/CommentService';

const State = styled.h3`
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  width: 70%;
`;

const Main = styled.div`
  width: 100%;
  background-color: #5454;
  padding: 0 20px;
  padding-bottom: 20px;
`;
const Introduction = styled.div`
  padding: 20px 0;
`;

const CommentSection = styled.section`
  width: 100%;
  background-color: #5454;
  margin-top: 30px;
`;

const CommentBox = styled.article`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 20px;
  background-color: #dad8daec;

  h3 {
    font-size: 20px;
    font-weight: 500;
  }

  main {
    margin: 5px 0;
  }

  footer {
    font-size: 10px;
  }

  aside {
    display: flex;
    justify-content: flex-end;
  }
`;

const fakeData = {
  applicationStatus: true,
  bookmark: true,
  currentPeople: 3,
  endDate: '22-09-02',
  introduction: '와인을 추천',
  maxPeople: 5,
  name: '와인 추천 웹 사이트',
  projectNo: 0,
  projectPositionDetailDtoList: [
    {
      positionName: 'PM',
      projectPositionNo: 0,
      userDto: {
        name: 'steve',
        no: 0,
        register: false,
      },
    },
    {
      positionName: 'Designer',
      projectPositionNo: 1,
      userDto: {
        name: 'chong',
        no: 1,
        register: true,
      },
    },
    {
      positionName: 'FE',
      projectPositionNo: 3,
      userDto: null,
    },
    {
      positionName: 'FE',
      projectPositionNo: 3,
      userDto: {
        name: 'waz',
        no: 2,
        register: false,
      },
    },
    {
      positionName: 'BE',
      projectPositionNo: 4,
      userDto: null,
    },
  ],
  startDate: '22-08-21',
  state: true,
  technicalStackList: ['typescript', 'next.js', 'redux'],
};
interface userDto {
  name: string;
  no: number;
  register: boolean;
}

interface positionList {
  positionName: string;
  projectPositionNo: number;
  userDto: userDto | null;
}

export interface data {
  applicationStatus: boolean;
  bookmark: boolean;
  currentPeople: number;
  endDate: string;
  introduction: string;
  maxPeople: number;
  name: string;
  projectNo: number;
  projectPositionDetailDtoList: positionList[];
  startDate: string;
  state: boolean;
  technicalStackList: string[];
}

interface comment {
  commentNo: number;
  content: string;
  createDate: string;
  registrant: string;
  userNo: number;
}

interface Props {
  project: data;
  comment: comment[];
}

const ProjectDetail = ({ project, comment }: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  const { userInfo, userProfile } = useAppSelector((state) => state.user);
  const [projectData, setProjectData] = useState<data>(project);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [comments, setComments] = useState<comment[]>(comment);
  const router = useRouter();

  useEffect(() => {
    const positionDetailList = projectData.projectPositionDetailDtoList;
    const Participants: (number | null | undefined)[] = positionDetailList.map(
      (position) => position.userDto?.no
    );

    setIsParticipant(Participants?.includes(userInfo.no));
    positionDetailList.forEach((position) => {
      const userDto = position.userDto;

      if (userDto?.no === userInfo.no) {
        setIsParticipant(true);

        if (userDto.register) setIsRegister(true);
      }
    });
  }, [userInfo]);

  return (
    <PrimaryLayout>
      <Title title={projectData?.name} />
      <State>{!projectData?.applicationStatus ? '모집중' : '모집종료'}</State>
      <Wrapper>
        <Left>
          <Main>
            <Title title="Positions" sm />
            <Position
              positionList={projectData?.projectPositionDetailDtoList}
              projectName={projectData?.name}
              isRegister={isRegister}
              isParticipant={isParticipant}
            />
            <Title title="Introduction" sm />
            <Introduction>{projectData?.introduction}</Introduction>
          </Main>
          <CommentSection>
            <Title title={`Comments (${comments.length})`} />
            <CommentInput
              projectNo={projectData.projectNo}
              setComments={setComments}
            />
            {comments?.map((comment: comment) => {
              const date = comment.createDate;
              const isRegistrant = userInfo.no === comment.userNo;

              return (
                <>
                  <CommentBox>
                    <h3>{comment.registrant}</h3>
                    <Comment
                      contentNo={comment.content}
                      content={comment.content}
                      isRegistrant={isRegistrant}
                    />
                    <footer>{date.substring(0, date.indexOf('T'))}</footer>
                  </CommentBox>
                </>
              );
            })}
          </CommentSection>
        </Left>
        {projectData && (
          <Side
            data={projectData}
            isRegister={isRegister}
            isParticipant={isParticipant}
          ></Side>
        )}
      </Wrapper>
    </PrimaryLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectNo = +(context.query.id || '');

  const projectData = await ProjectService.getProjectDetail(projectNo);
  const commentData = await CommentService.getComments(projectNo);
  return {
    props: {
      project: projectData.data,
      comment: commentData.data.content,
    },
  };
};

export default ProjectDetail;
