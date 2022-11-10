import { colors } from '@/styles/theme';
import styled from '@emotion/styled';

type ButtonProps = {
  wFull?: boolean;
  gray?: boolean;
};

const PrimaryButton = styled.button<ButtonProps>`
  ${(props) =>
    props.wFull
      ? `width: 100%; 
    margin: 10px 0;`
      : 'margin: 10px;'}
  padding: 10px 18px;
  border-radius: 3px;
  border: none;
  color: ${colors.white};
  background-color: ${(props) =>
    props.gray ? colors.gray200 : colors.primary};
  cursor: pointer;
`;
export default PrimaryButton;
