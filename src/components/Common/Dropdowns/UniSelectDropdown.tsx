import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  outline: none;
  border: 1px solid ${colors.gray300};
  height: 30px;
  padding: 5px;
`;

const Option = styled.option`
  border: 1px solid ${colors.gray300};
`;

interface DropdownProps {
  id?: string;
  title: string;
  items: string[];
  selectedItem: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
}

const UniSelectDropdown = ({
  title,
  items,
  selectedItem,
  setItem,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItem(e.target.value);
  };

  return (
    <Container>
      <Select
        name={title}
        className="select"
        value={selectedItem}
        onChange={handleChange}
      >
        {items.map((item) => {
          return (
            <Option key={uuidv4()} value={item}>
              {item}
            </Option>
          );
        })}
      </Select>
    </Container>
  );
};

export default UniSelectDropdown;
