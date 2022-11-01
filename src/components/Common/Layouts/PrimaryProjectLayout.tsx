import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { ProjectType } from 'src/services/ProjectService';
import { Divider } from 'src/styles/global';
import ProjectCard from '../Cards/ProjectCard';

const Section = styled.section`
  margin-top: 20px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  @media ${(props) => props.theme.mq.desktopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${(props) => props.theme.mq.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  gap: 20px;
`;

const H1 = styled.h1`
  font-size: 24px;
  padding: 10px 0;
`;
const Span = styled.span`
  font-size: 16px;
  color: #777;
`;

interface PropsPrimaryProjectLayout {
  title: string;
  projectDtoList: ProjectType[];
  href: string;
}

const PrimaryProjectLayout: React.FC<PropsPrimaryProjectLayout> = ({
  title,
  projectDtoList,
  href,
}) => {
  return (
    <Section>
      <Flex>
        <H1>{title}</H1>
        <Span>
          <Link href={href}>&gt; more</Link>
        </Span>
      </Flex>
      <Divider />
      <Grid>
        {projectDtoList?.map(({ projectNo, ...projectDto }) => (
          <ProjectCard
            key={projectNo}
            projectDto={{ projectNo, ...projectDto }}
            size="medium"
          />
        ))}
      </Grid>
    </Section>
  );
};

export default PrimaryProjectLayout;
