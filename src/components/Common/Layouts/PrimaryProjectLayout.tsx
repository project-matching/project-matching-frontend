import { colors, fontSize, screen } from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { ProjectType } from 'src/services/ProjectService';
import { Divider } from 'src/styles/global';
import ProjectCard from '../Cards/ProjectCard';

const Section = styled.section`
  margin-top: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProjectCardContainer = styled.div`
  display: grid;
  @media ${screen.large} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${screen.medium} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  gap: 20px;
`;

const Title = styled.h1`
  font-size: ${fontSize.xl};
  padding: 10px 0;
`;
const MoreLink = styled.span`
  font-size: ${fontSize.lg};
  color: ${colors.gray800};
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
      <TitleContainer>
        <Title>{title}</Title>
        <MoreLink>
          <Link href={href}>&gt; more</Link>
        </MoreLink>
      </TitleContainer>
      <Divider />
      <ProjectCardContainer>
        {projectDtoList?.map(({ projectNo, ...projectDto }) => (
          <ProjectCard
            key={projectNo}
            projectDto={{ projectNo, ...projectDto }}
            size="medium"
          />
        ))}
      </ProjectCardContainer>
    </Section>
  );
};

export default PrimaryProjectLayout;
