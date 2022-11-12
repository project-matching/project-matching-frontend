import { colors, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { getPathTitle } from 'src/utils/common';
import { LinksProps } from './RoutingSidebar';

interface MainSectionProps extends React.PropsWithChildren {
  links: LinksProps[];
}

const MainSection = ({ children, links }: MainSectionProps) => {
  const router = useRouter();

  return (
    <Article>
      <ArticleTitle>{getPathTitle(router.pathname, links)}</ArticleTitle>
      <div>{children}</div>
    </Article>
  );
};

export default MainSection;

const Article = styled.article`
  padding: 40px 100px;
  width: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray300};
`;

const ArticleTitle = styled.h2`
  font-weight: ${fontWeight.bold};
  margin-bottom: 50px;
`;
