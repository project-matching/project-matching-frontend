import { fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';

const Div = styled.div`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  padding-bottom: 5px;
`;

const Logo = () => {
  return <Div>Logo</Div>;
};

export default Logo;
