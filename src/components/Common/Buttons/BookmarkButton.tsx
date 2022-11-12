import styled from '@emotion/styled';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';

const IconButton = styled.button`
  border: none;
  background: transparent;
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  isBookmarked: boolean;
  onClick: () => void;
}

const BookmarkButton = forwardRef<HTMLButtonElement, Props>(
  ({ isBookmarked, onClick }: Props, ref) => {
    return (
      <IconButton onClick={onClick} ref={ref}>
        {isBookmarked ? (
          <FontAwesomeIcon icon={solid('bookmark')} />
        ) : (
          <FontAwesomeIcon icon={regular('bookmark')} />
        )}
      </IconButton>
    );
  }
);

BookmarkButton.displayName = 'Bookmark';

export default BookmarkButton;
