import styled from '@emotion/styled';
import { ProjectDtoType } from 'src/redux/reducers/projects/project';
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
`;

interface SecondaryProjectLayoutProps {
  title: string;
  projectDtoList: ProjectDtoType[];
}

const SecondaryProjectLayout = ({
  title,
  projectDtoList,
}: SecondaryProjectLayoutProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Grid>
        {projectDtoList.map(({ projectNo, ...projectDto }) => (
          <SmallCard
            key={projectNo}
            projectDto={{ projectNo, ...projectDto }}
          />
        ))}
      </Grid>
    </>
  );
};

export default SecondaryProjectLayout;
