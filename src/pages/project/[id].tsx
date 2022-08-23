import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import Comment from '@/components/Post/Comment';
import Position from '@/components/Post/Position';
import Side from '@/components/Post/Side';
import styled from '@emotion/styled';

const State = styled.h3`
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
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

const CommentWrapper = styled.div``;

const fakeData = {
  "applicationStatus": true,
  "bookmark": true,
  "currentPeople": 0,
  "endDate": "string",
  "introduction": "와인을 추천",
  "maxPeople": 0,
  "name": "와인 추천 웹 사이트",
  "projectNo": 0,
  "projectPositionDetailDtoList": [
    {
      "positionName": "PM",
      "projectPositionNo": 0,
      "userDto": {
        "name": "steve",
        "no": 0,
        "register": true
      }
    },
    {
      "positionName": "Designer",
      "projectPositionNo": 1,
      "userDto": {
        "name": "elon",
        "no": 1,
        "register": false
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
  "startDate": "string",
  "state": true,
  "technicalStackList": [
    "string"
  ]
}

const ProjectDetail = ({data = fakeData}) => {
  
  return (
    <PrimaryLayout>
      <Title title={data.name} />
      <State>{data.applicationStatus ? '모집중' : '모집종료'}</State>
      <Wrapper>
        <Left>
          <Main>
            <Title title="Positions" sm />
            <Position positionList={data.projectPositionDetailDtoList} />
            <Title title="Introduction" sm />
            <Introduction>{data.introduction}</Introduction>
          </Main>
          <Comment />
        </Left>
        <Side data={data}></Side>
      </Wrapper>
    </PrimaryLayout>
  );
};

export default ProjectDetail;

// ssr로 api /v1/project/params.id 로 project 정보 받아오면 됨
