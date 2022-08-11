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
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  background-color: white;
  color: #444;
  cursor: pointer;
`;
export default SecondaryButton;
