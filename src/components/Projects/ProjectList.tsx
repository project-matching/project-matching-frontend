import styled from '@emotion/styled';
import SmallCard from './SmallCard';

const ProjectList = () => {
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
  return (
    <Grid>
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
    </Grid>
  );
};

export default ProjectList;
