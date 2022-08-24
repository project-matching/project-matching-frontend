import styled from '@emotion/styled';
import { ProjectType } from 'src/services/ProjectService';
import SmallCard from './SmallCard';

const Title = styled.h2`
  margin: 30px 0;
  font-size: ${(props) => props.theme.sizes.xl};
  font-weight: bold;
`;
const Grid = styled.div`
  display: grid;
  @media ${(props) => props.theme.mq.desktopL} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${(props) => props.theme.mq.tablet} {
    grid-template-columns: 1fr;
  }

  gap: 20px;

  margin-bottom: 50px;
`;

interface BookmarkProjectLayoutProps {
  title: string;
  projectDtoList: ProjectType[];
}

const BookmarkProjectLayout = ({
  title,
  projectDtoList,
}: BookmarkProjectLayoutProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Grid>
        {projectDtoList.map(({ projectNo, ...projectDto }) => (
          <SmallCard
            key={projectNo}
            projectDto={{ projectNo, ...projectDto }}
            update={true}
          />
        ))}
      </Grid>
    </>
  );
};

export default BookmarkProjectLayout;
