import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface LinksProps {
  id: number;
  href: string;
  title: string;
}

interface RoutingSidebarProps {
  links: LinksProps[];
}

const RoutingSidebar = ({ links }: RoutingSidebarProps) => {
  const router = useRouter();

  const A = styled.a`
    color: ${(props) =>
      props.href === router.asPath
        ? props.theme.colors.black
        : props.theme.colors.gray};
    font-weight: ${(props) => (props.href === router.asPath ? 'bold' : null)};

    &:hover {
      text-decoration: underline;
    }
  `;

  return (
    <Container>
      {links.map(({ id, href, title }) => (
        <Link key={id} href={href} passHref>
          <A>{title}</A>
        </Link>
      ))}
    </Container>
  );
};

export default RoutingSidebar;

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

    &:visited {
    }
  }
`;
