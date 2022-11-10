import { colors, fontSize, fontWeight } from '@/styles/theme';
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

  const SideLink = styled.a`
    color: ${(props) =>
      props.href === router.asPath ? colors.black : colors.gray200};
    font-weight: ${(props) =>
      props.href === router.asPath ? fontWeight.bold : null};

    &:hover {
      text-decoration: underline;
    }
  `;

  return (
    <RoutingContainer>
      {links.map(({ id, href, title }) => (
        <Link key={id} href={href} passHref>
          <SideLink>{title}</SideLink>
        </Link>
      ))}
    </RoutingContainer>
  );
};

export default RoutingSidebar;

const RoutingContainer = styled.aside`
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid ${colors.gray300};

  a {
    margin-bottom: 10px;
    font-size: ${fontSize.m};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
