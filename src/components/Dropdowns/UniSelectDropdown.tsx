import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  outline: none;
  border: 1px solid #d4d4d4;
  height: 30px;
  padding: 5px;
`;

const Option = styled.option`
  border: 1px solid #d4d4d4;
`;

interface DropdownProps {
  id?: string;
  title: string;
  items: string[];
  selectedItem: string;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}

const UniSelectDropdown = ({
  title,
  items,
  selectedItem,
  onChange,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <Container>
      <Select
        name={title}
        className="select"
        defaultValue={selectedItem}
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
