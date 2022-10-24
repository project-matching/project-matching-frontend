import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putPosition } from 'src/redux/reducers/positions';
import { Input } from '../DashboardCommon';

interface Props {
  positionName: string;
  positionNo: number;
}

const PositionItem = ({ positionName, positionNo }: Props) => {
  const [isEdit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(positionName);
  const dispatch = useDispatch();

  const editPosition = async () => {
    dispatch(
      putPosition({
        positionNo,
        positionName: inputValue,
      })
    );
    setEdit(false);
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
