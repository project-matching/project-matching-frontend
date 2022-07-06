import styled from '@emotion/styled';

interface ButtonProps {
  content: string;
  clickEvent: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({ content, clickEvent }) => {
  const Button = styled.button`
    margin: 10px;
    padding: 10px 18px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #2937f5;
  `;

  return <Button onClick={clickEvent}>{content}</Button>;
};

export default PrimaryButton;
