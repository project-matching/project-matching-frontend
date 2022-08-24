import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import Position from '@/components/Post/Position';
import DetailSection from '@/components/Post/Side';
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
  "startDate": "22-08-21",
  "state": true,
  "technicalStackList": [
    "typescript",
    "next.js",
    "redux"
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
            <Position positionList={data.projectPositionDetailDtoList} projectName={data.name} />
            <Title title="Introduction" sm />
            <Introduction>{data.introduction}</Introduction>
          </Main>
        </Left>
        <DetailSection data={data}></DetailSection>
      </Wrapper>
    </PrimaryLayout>
  );
};

export default ProjectDetail;

// ssr로 api /v1/project/params.id 로 project 정보 받아오면 됨
