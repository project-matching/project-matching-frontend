import styled from '@emotion/styled';
import Link from 'next/link';

const A = styled.div`
  font-size: 24px;
  font-weight: bold;
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
