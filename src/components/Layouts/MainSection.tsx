import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { LinksProps } from '../MyPage/MyPageLayout';

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

interface MainSectionProps extends React.PropsWithChildren {
  links: LinksProps[];
}

const MainSection = ({ children, links }: MainSectionProps) => {
  const router = useRouter();

  const getTitle = (path: string) => {
    return links.find(({ href }) => href === path)?.title;
  };

  return (
    <Article>
      <ArticleTitle>{getTitle(router.pathname)}</ArticleTitle>
      <ArticleContnet>{children}</ArticleContnet>
    </Article>
  );
};

export default MainSection;
