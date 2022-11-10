import { colors, fontSize } from '@/styles/theme';
import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { filterSelectedItems } from 'src/utils/common';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownInput = styled.div`
  border: 1px solid ${colors.gray300};
  width: 100%;
  min-height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  i {
    margin: 0 10px;
  }
`;

const SelectedItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px 10px;
  transition: flex 0.5s ease-out;
`;

const SelectedItem = styled.div`
  padding: 5px 10px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background-color: ${colors.primary};
  color: ${colors.white};

  div {
    margin-right: 10px;
    font-size: ${fontSize.m};
  }

  svg {
    height: 15px;

    * {
      pointer-events: none;
    }
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray300};
  border-top: none;
  background-color: ${colors.white};
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
`;

const OptionItem = styled.div`
  padding: 7px 10px;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

interface DropdownProps {
  id?: string;
  items: string[];
  selectedItems: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}

/**
 * TODO:
 * 추가 삭제 기능 -> textContent 말고 다른 방법 고려 (e.g. id 사용)
 */

const MultiSelectDropdown = ({
  items,
  selectedItems,
  setSelectedItem,
}: DropdownProps) => {
  const [options, setOption] = useState<string[]>(
    filterSelectedItems(items, selectedItems)
  );
  const [open, setOpen] = useState(false);

  const chevronEl = useRef<HTMLElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);

  const removeItem = (e: React.MouseEvent) => {
    const target = e.target as Node;
    const content = target?.parentNode?.firstChild?.textContent;
    if (content) {
      setSelectedItem(selectedItems.filter((item) => item !== content));
      setOption([...options, content].sort());
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    const target = e.target as Node;
    if (target === e.currentTarget || chevronEl.current?.contains(target)) {
      setOpen(!open);
    }
  };

  const closeDropdown = (e: Event) => {
    if (open && !containerEl.current?.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  const handleOption = (e: React.MouseEvent) => {
    const target = e.target as typeof e.target & {
      textContent: string;
    };
    const content = target.textContent;
    setOption(options.filter((option) => option !== content));
    setSelectedItem([...selectedItems, content].sort());
  };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  });

  useEffect(() => {
    setOption((_options) => filterSelectedItems(items, selectedItems));
  }, [items, selectedItems]);

  return (
    <>
      {items.length > 0 && (
        <Container ref={containerEl}>
          <DropdownInput onClick={toggleDropdown}>
            <SelectedItemContainer>
              {selectedItems.map((selectedItem) => (
                <SelectedItem key={uuidv4()}>
                  <div>{selectedItem}</div>
                  <FontAwesomeIcon icon={solid('xmark')} onClick={removeItem} />
                </SelectedItem>
              ))}
            </SelectedItemContainer>
            <i ref={chevronEl}>
              {open ? (
                <FontAwesomeIcon icon={solid('chevron-up')} />
              ) : (
                <FontAwesomeIcon icon={solid('chevron-down')} />
              )}
            </i>
          </DropdownInput>
          {open && items.length !== selectedItems.length ? (
            <OptionContainer>
              {options.map((option) => (
                <OptionItem key={uuidv4()} onClick={handleOption}>
                  {option}
                </OptionItem>
              ))}
            </OptionContainer>
          ) : null}
        </Container>
      )}
    </>
  );
};

export default MultiSelectDropdown;
