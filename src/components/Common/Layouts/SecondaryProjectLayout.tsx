import { fontSize, fontWeight, screen } from '@/styles/theme';
import styled from '@emotion/styled';
import { ProjectType } from 'src/services/ProjectService';
import ProjectCard from '../Cards/ProjectCard';

const Title = styled.h2`
  margin: 30px 0;
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
`;
const Grid = styled.div`
  display: grid;
  @media ${screen.large} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${screen.medium} {
    grid-template-columns: 1fr;
  }

  gap: 20px;

  margin-bottom: 50px;
`;

interface SecondaryProjectLayoutProps {
  title: string;
  projectDtoList: ProjectType[];
  bookmarkOnly?: boolean;
}

const SecondaryProjectLayout = ({
  title,
  projectDtoList,
  bookmarkOnly = false,
}: SecondaryProjectLayoutProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Grid>
        {projectDtoList.map(({ projectNo, ...projectDto }) => (
          <ProjectCard
            key={projectNo}
            projectDto={{ projectNo, ...projectDto }}
            bookmarkOnly={bookmarkOnly}
            size="large"
          />
        ))}
      </Grid>
    </>
  );
};

export default SecondaryProjectLayout;
