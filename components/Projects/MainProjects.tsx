import { Divider } from '@/styles/global';
import styled from '@emotion/styled';
import React from 'react';
import SmallCard from './SmallCard';

interface PropsMainProjects {
  title: string;
}

const MainProjects: React.FC<PropsMainProjects> = ({ title }) => {
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 30px;
  `;

  const H1 = styled.h1`
    font-size: 24px;
    padding: 10px 0;
  `;
  const Span = styled.span`
    font-size: 16px;
    color: #777;
  `;

  return (
    <Section>
      <Flex>
        <H1>{title}</H1>
        <Span>&gt; more</Span>
      </Flex>
      <Divider />
      <Grid>
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </Grid>
    </Section>
  );
};

export default MainProjects;
