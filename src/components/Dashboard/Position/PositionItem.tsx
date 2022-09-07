import styled from '@emotion/styled';
import { useState } from 'react';

const Item = styled.li`
  margin: 20px 0;
  list-style: none;
  font-size: ${(props) => props.theme.sizes.m};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 300px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #d4d4d4;
`;

interface PropsType {
  positionName: string;
}

const PositionItem = ({ positionName }: PropsType) => {
  const [isEdit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(positionName);

  const editPosition = () => {
    /**
     * TODO:
     * confirm 모달 열기
     * 모달에서 확인 누르면 api call
     */
  };

  return (
    <Item>
      {isEdit ? (
        <InputContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <ButtonContainer>
            <a onClick={editPosition}>수정</a>
            <a onClick={() => setEdit(false)}>취소</a>
          </ButtonContainer>
        </InputContainer>
      ) : (
        <>
          <div>{positionName}</div>
          <a onClick={() => setEdit(true)}>수정</a>
        </>
      )}
    </Item>
  );
};

export default PositionItem;
