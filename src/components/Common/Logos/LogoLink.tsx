import { fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';

const A = styled.div`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  padding-bottom: 5px;
  cursor: pointer;
`;

const LogoLink = () => {
  return (
    <Link href="/" passHref>
      <A>Logo</A>
    </Link>
  );
};

export default LogoLink;
