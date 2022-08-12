import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

const ItemContainers = styled.div`
  span {
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

interface DropdownProps {
  items: string[];
}

const Dropdown = ({ items }: DropdownProps) => {
  return (
    <ItemContainers>
      {items.map((item) => (
        <span key={uuidv4()}>{item}</span>
      ))}
    </ItemContainers>
  );
};

export default Dropdown;
