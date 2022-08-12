import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.aside`
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid #d4d4d4;

  a {
    margin-bottom: 10px;
    font-size: ${(props) => props.theme.sizes.m};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const links = [
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

const MyPageSidebar = () => {
  return (
    <Container>
      {links.map(({ id, href, title }) => (
        <Link key={id} href={href}>
          <a>{title}</a>
        </Link>
      ))}
    </Container>
  );
};

export default MyPageSidebar;
