import styled from '@emotion/styled';

type ButtonProps = {
  wFull?: boolean;
  gray?: boolean;
};

const SmallButton = styled.button<ButtonProps>`
  ${(props) =>
    props.wFull
      ? `
      width: 100%; 
      margin: 5px 0;
    `
      : `
      margin: 5px 0;
    `}
  padding: 5px 10px;
  border: none;
  color: white;
  background-color: ${(props) =>
    props.gray ? props.theme.colors.gray : props.theme.colors.primary};
  cursor: pointer;
`;
export default SmallButton;
