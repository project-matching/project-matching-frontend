import styled from '@emotion/styled';
import React from 'react';
import MyPageSection from './MyPageSection';
import MyPageSidebar from './Sidebar';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 40px 0;
  font-weight: bold;
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const MyPageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Container>
      <Title>내 페이지</Title>
      <Section>
        <MyPageSidebar />
        <MyPageSection>{children}</MyPageSection>
      </Section>
    </Container>
  );
};

export default MyPageLayout;
