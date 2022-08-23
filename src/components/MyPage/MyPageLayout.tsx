import styled from '@emotion/styled';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import MyPageSection from './MyPageSection';
import MyPageSidebar from './Sidebar';

const Container = styled.div`
  margin: 0 auto 100px;
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

export interface LinksProps {
  id: number;
  href: string;
  title: string;
}

const links: LinksProps[] = [
  {
    id: 0,
    href: '/mypage',
    title: '내 프로필',
  },
  {
    id: 1,
    href: '/mypage/change-profile',
    title: '내 프로필 변경',
  },
  {
    id: 2,
    href: '/mypage/change-password',
    title: '비밀번호 변경',
  },
  {
    id: 3,
    href: '/mypage/delete-account',
    title: '회원 탈퇴',
  },
];

const MyPageLayout = ({ children }: React.PropsWithChildren) => {
  const userProfile = useAppSelector((state) => state.user.userProfile);

  return (
    <>
      {userProfile?.email && (
        <Container>
          <Title>내 페이지</Title>
          <Section>
            <MyPageSidebar links={links} />
            <MyPageSection links={links}>{children}</MyPageSection>
          </Section>
        </Container>
      )}
    </>
  );
};

export default MyPageLayout;
