import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler;
  color?: 'black' | 'white';
}

const CloseButton = ({ onClick, color = 'black' }: Props) => {
  const IconButton = styled.button`
    border: none;
    background: transparent;
    width: 15px;
    height: 15px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors[color]};

    * {
      height: 15px;
      pointer-events: none;
    }
  `;

  return (
    <IconButton onClick={onClick}>
      <FontAwesomeIcon icon={solid('xmark')} />
    </IconButton>
  );
};

export default CloseButton;
