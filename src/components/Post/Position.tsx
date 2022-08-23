import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PositionItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: 5px;
`

const ApplyButton = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`

interface UserDto {
  name: string;
  no: number;
  register: boolean;
}

interface PositionList {
  positionName: string,
  projectPositionNo: number,
  userDto: UserDto | null,
}

interface Props {
  positionList: PositionList[],
}

interface list {
  [positionName: string]: (UserDto | null)[],
}

const Position: FC<Props> = ({ positionList }) => {
  const [positions, setPositionList] = useState<list>({});

  useEffect(() => {
    const filteredPosition: list = {};

    positionList.forEach((position) => {
      if (filteredPosition[position.positionName]) {
        filteredPosition[position.positionName].push(position.userDto);
      } else {
        filteredPosition[position.positionName] = [position.userDto];
      }
    });

    setPositionList(filteredPosition);
  }, []);

  return (
    <PositionContainer>
      {Object.keys(positions).map((positionName) => {
        const total = positions[positionName].length;
        const now = positions[positionName].filter(v => !v).length;
        const state = now === total;
        
        return (
          <PositionItem key={positionName}>
            <div>{positionName}</div>
            <div>{now} / {total}</div>
            <ApplyButton disabled={state}>{state ? "Done" : "Apply"}</ApplyButton>
          </PositionItem>
        )
      })}
    </PositionContainer>
  );
};

export default Position;
