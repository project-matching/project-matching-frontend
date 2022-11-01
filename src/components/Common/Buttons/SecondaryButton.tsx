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
  border: ${(props) => `1px solid ${props.theme.colors.darkGray}`};
  color: ${(props) => props.theme.colors.black};
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => !props.disabled && props.theme.colors.gray};
    color: ${(props) => !props.disabled && 'white'};
    border: ${(props) => `1px solid ${props.theme.colors.gray}`};
  }
`;
export default SecondaryButton;
