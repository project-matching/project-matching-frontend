import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import Position from '@/components/Post/Position';
import Side from '@/components/Post/Side';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { CommentService } from 'src/services/CommentService';
import Comment from '../../components/Post/Comment';
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
`

const fakeData = {
  "applicationStatus": true,
  "bookmark": true,
  "currentPeople": 3,
  "endDate": "22-09-02",
  "introduction": "와인을 추천",
  "maxPeople": 5,
  "name": "와인 추천 웹 사이트",
  "projectNo": 0,
  "projectPositionDetailDtoList": [
    {
      "positionName": "PM",
      "projectPositionNo": 0,
      "userDto": {
        "name": "steve",
        "no": 0,
        "register": false,
      }
    },
    {
      "positionName": "Designer",
      "projectPositionNo": 1,
      "userDto": {
        "name": "chong",
        "no": 1,
        "register": true,
      }
    },
    {
      "positionName": "FE",
      "projectPositionNo": 3,
      "userDto": null,
    },
    {
      "positionName": "FE",
      "projectPositionNo": 3,
      "userDto": {
        "name": "waz",
        "no": 2,
        "register": false
      },
    },
    {
      "positionName": "BE",
      "projectPositionNo": 4,
      "userDto": null,
    }
  ],
  "startDate": "22-08-21",
  "state": true,
  "technicalStackList": [
    "typescript",
    "next.js",
    "redux"
  ]
}

interface comment {
  commentNo: number,
  content: string,
  createDate: string
  registrant: string,
  userNo: number,
}

const ProjectDetail = ({ data = fakeData }) => {
  const token = useAppSelector(state => state.auth.token);
  const { userInfo, userProfile, } = useAppSelector(state => state.user);
  const [isParticipant, setIsParticipant] = useState<Boolean>(false);
  const [isRegister, setIsRegister] = useState<Boolean>(false);
  const [comments, setComments] = useState<comment[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const projectNo= router.query.id;
      const response = await CommentService.getComments(projectNo);

      setComments(response.data);
      // mockData
      // const ex = [
      //   {
      //     "commentNo": 0,
      //     "content": "hello",
      //     "createDate": "2022-08-25T15:42:14.373Z",
      //     "registrant": "Elon",
      //     "userNo": 0
      //   },
      //   {
      //     "commentNo": 1,
      //     "content": "good",
      //     "createDate": "2022-08-25T15:42:14.373Z",
      //     "registrant": "younchong",
      //     "userNo": 1
      //   },
      //   {
      //     "commentNo": 2,
      //     "content": "bye",
      //     "createDate": "2022-08-25T15:42:14.373Z",
      //     "registrant": "Steve",
      //     "userNo": 2
      //   },
      // ];
      // setComments(ex);
    })();
  }, []);

  useEffect(() => {
    const positionDetailList = data.projectPositionDetailDtoList;
    const Participants: (number | null | undefined)[] = data.projectPositionDetailDtoList.map(position => position.userDto?.no);

    setIsParticipant(Participants.includes(userInfo.no));
    data.projectPositionDetailDtoList.forEach(position => {
      const userDto = position.userDto;

      if (userDto?.no === userInfo.no) {
        setIsParticipant(true);

        if (userDto.register) setIsRegister(true);
      }
    });
  }, [token]);

  return (
    <PrimaryLayout>
      <Title title={data.name} />
      <State>{data.applicationStatus ? '모집중' : '모집종료'}</State>
      <Wrapper>
        <Left>
          <Main>
            <Title title="Positions" sm />
            <Position positionList={data.projectPositionDetailDtoList} projectName={data.name} />
            <Title title="Introduction" sm />
            <Introduction>{data.introduction}</Introduction>
          </Main>
          <CommentSection>
            <Title title={`Comments (${comments.length})`}/>
            {comments.map((comment: comment) => {
              const date = comment.createDate;
              const isRegistrant = userInfo.no === comment.userNo;

              return (
                <>
                  <CommentBox>
                    <h3>{comment.registrant}</h3>
                    <Comment contentNo={comment.content} content={comment.content} isRegistrant={isRegistrant} />
                    <footer>{date.substring(0, date.indexOf("T"))}</footer>
                  </CommentBox>
                </>
              )
            })}
          </CommentSection>
        </Left>
        <Side data={data}></Side>
      </Wrapper>
    </PrimaryLayout>
  );
};

// ssr로 api /v1/project/params.id 로 project 정보 받아오면 됨
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const projectNo = context.query.id as string
//   const data = await ProjectService.getProjectDetail(projectNo);

//   return {
//     props: { data }
//   }
// }

export default ProjectDetail;
