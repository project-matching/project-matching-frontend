import { colors } from '@/styles/theme';
import styled from '@emotion/styled';

type ButtonProps = {
  wFull?: boolean;
};

const SecondaryButton = styled.button<ButtonProps>`
  ${(props) =>
    props.wFull
      ? `width: 100%; 
    margin: 10px 0;`
      : 'margin: 10px;'}
  padding: 10px 18px;
  border: 1px solid ${colors.gray300};
  color: ${colors.black};
  background-color: ${colors.white};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => !props.disabled && colors.gray200};
    color: ${(props) => !props.disabled && colors.white};
    border: 1px solid ${colors.gray200};
  }
`;
export default SecondaryButton;
