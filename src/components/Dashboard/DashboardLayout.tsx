import styled from '@emotion/styled';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { dashboardPath } from 'src/utils/path';
import { ROLE_ADMIN } from 'src/utils/userRole';
import MainSection from '../Layouts/MainSection';
import PrimaryLayout from '../Layouts/PrimaryLayout';
import RoutingSidebar, { LinksProps } from '../Layouts/RoutingSidebar';

export const links: LinksProps[] = [
  {
    id: 0,
    href: dashboardPath.notification,
    title: '공지 알림',
  },
  {
    id: 1,
    href: dashboardPath.position,
    title: '프로젝트 포지션 관리',
  },
  {
    id: 2,
    href: dashboardPath.techStack,
    title: '기술 스택 관리',
  },
  {
    id: 3,
    href: dashboardPath.user,
    title: '유저 관리',
  },
];

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { role } = useAppSelector((state) => state.user.userInfo);

  return (
    <PrimaryLayout>
      {role === ROLE_ADMIN && (
        <Container>
          <Title>Dashboard</Title>
          <Section>
            <RoutingSidebar links={links} />
            <MainSection links={links}>{children}</MainSection>
          </Section>
        </Container>
      )}
    </PrimaryLayout>
  );
};

export default DashboardLayout;

const Container = styled.div`
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 40px 0;
  font-weight: bold;
  font-size: ${(props) => props.theme.sizes.xl};
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
