import { colors } from '@/styles/theme';
import styled from '@emotion/styled';

type ButtonProps = {
  wFull?: boolean;
  gray?: boolean;
};

const SmallButton = styled.button<ButtonProps>`
  width: ${(props) => (props.wFull ? `100%` : null)};
  margin: 5px 0;
  padding: 5px 10px;
  border: none;
  color: ${colors.white};
  background-color: ${(props) =>
    props.gray ? colors.gray200 : colors.primary};
  cursor: pointer;
`;
export default SmallButton;
