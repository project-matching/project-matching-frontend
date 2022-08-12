import styled from '@emotion/styled';

const Article = styled.article`
  padding: 40px 100px;
  width: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d4d4d4;
`;

const ArticleTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 50px;
`;

const ArticleContnet = styled.div``;

const MyPageSection = ({ children }: React.PropsWithChildren) => {
  // TODO: ArticleTitle 동적 변경

  return (
    <Article>
      <ArticleTitle>내 프로필</ArticleTitle>
      <ArticleContnet>{children}</ArticleContnet>
    </Article>
  );
};

export default MyPageSection;
