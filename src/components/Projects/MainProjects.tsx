import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { Divider } from 'src/styles/global';
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

  return (
    <Section>
      <Flex>
        <H1>{title}</H1>
        <Span>
          <Link href={title === 'Recruiting' ? 'recruiting' : 'recruited'}>
            &gt; more
          </Link>
        </Span>
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
