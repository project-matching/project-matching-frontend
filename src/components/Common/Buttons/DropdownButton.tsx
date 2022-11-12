import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';

const DropdownButtonContainer = styled.button`
  border: none;
  background-color: transparent;
  width: 15px;
  margin: 0;
  padding: 0;
`;

interface Props {
  open: boolean;
}

const DropdownButton = forwardRef<HTMLButtonElement, Props>(
  ({ open }: Props, ref) => {
    return (
      <DropdownButtonContainer ref={ref}>
        {open ? (
          <FontAwesomeIcon icon={solid('chevron-up')} />
        ) : (
          <FontAwesomeIcon icon={solid('chevron-down')} />
        )}
      </DropdownButtonContainer>
    );
  }
);

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
