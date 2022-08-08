import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import Comment from '@/components/Post/Comment';
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
  background-color: #9797;
  padding: 20px 0;
`;

const CommentWrapper = styled.div``;

const ProjectDetail = () => {
  const fakeData = {
    ProjectNum: 1,
    title: '와인 웹사이트',
    startData: '2022-02-02',
    endData: '2022-02-04',
    currentState: true,
    content: 'asdasfegreg',
    currentPeople: 5,
    allPeople: 10,
    Bookmark: false,
    req: false,
    tech: [
      {
        id: 1,
        name: 'react',
      },
      {
        id: 2,
        name: 'spring',
      },
    ],
    position: [
      {
        id: 1,
        name: 'Frontend',
        user: {
          id: 1,
          name: 'DM',
          apply: false,
        },
      },
      {
        id: 1,
        name: 'Frontend',
        user: {
          id: 2,
          name: 'bb',
          apply: false,
        },
      },
      {
        id: 2,
        name: 'Backend',
        user: {
          id: 3,
          name: 'QQ',
          apply: false,
        },
      },
    ],
  };
  return (
    <PrimaryLayout>
      <Title title={fakeData.title} />
      <State>{fakeData.currentState ? '모집중' : '모집종료'}</State>
      <Wrapper>
        <Left>
          <Main>
            <Title title="Positions" sm />
            {fakeData.position.map((v) => v.name)}
            <Title title="Introduction" sm />
            <Introduction>{fakeData.content}</Introduction>
          </Main>
          <Comment />
        </Left>
        <Side data={fakeData}></Side>
      </Wrapper>
    </PrimaryLayout>
  );
};

export default ProjectDetail;
