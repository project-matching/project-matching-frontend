import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const SearchButton = () => {
  return (
    <IconButton type="submit">
      <FontAwesomeIcon icon={solid('magnifying-glass')} />
    </IconButton>
  );
};

export default SearchButton;
