import styled from '@emotion/styled';

type ButtonProps = {
  wFull?: boolean;
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
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;
export default PrimaryButton;
