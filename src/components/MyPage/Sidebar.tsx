import styled from '@emotion/styled';
import Link from 'next/link';
import { LinksProps } from './MyPageLayout';

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

interface MyPageSidebarProps {
  links: LinksProps[];
}

const MyPageSidebar = ({ links }: MyPageSidebarProps) => {
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
