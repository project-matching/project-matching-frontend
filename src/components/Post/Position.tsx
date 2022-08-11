import styled from '@emotion/styled';
import { FC, useCallback, useEffect, useState } from 'react';
import { IPositionList } from 'src/redux/reducers/position/type';

const Cir = styled.div`
  background-color: black;
  width: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: 40px;
  margin-right: 20px;
  cursor: pointer;
`;
const Box = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
`;
const Title = styled.span`
  width: 10%;
`;

interface Props {
  data: IPositionList;
  Selected: string;
  positionBoolean: boolean;
  userInfo: any;
  setProjectPositionRegisterDtoList: any;
  projectPositionRegisterDtoList: any;
  positionList: any;
}

const Position: FC<Props> = ({
  data,
  positionBoolean,
  userInfo,
  Selected,
  setProjectPositionRegisterDtoList,
  projectPositionRegisterDtoList,
  positionList,
}) => {
  const [number, setNumber] = useState<number>(0);
  const [meNumber, setMeNumber] = useState<number>(0);

  useEffect(() => {
    if (Selected) {
      setProjectPositionRegisterDtoList([
        {
          position:
            Selected === positionList[0].positionName
              ? positionList[0]
              : Selected === positionList[1].positionName
              ? positionList[1]
              : positionList[2],
          projectRegisterUserDto: {
            no: userInfo && userInfo.no,
          },
        },
      ]);
    }
  }, [Selected, positionList, userInfo, setProjectPositionRegisterDtoList]);

  useEffect(() => {
    setNumber(0);
    setMeNumber(0);
    if (positionBoolean === true) {
      setMeNumber((cur) => cur + 1);
      setNumber((cur) => cur + 1);
    } else if (positionBoolean && meNumber > 0) {
      setMeNumber((cur) => cur - 1);
      setNumber((cur) => cur - 1);
    }
  }, [positionBoolean, meNumber]);

  const onUpdate = useCallback(
    () => () => {
      setNumber((cur) => cur + 1);
      setProjectPositionRegisterDtoList([
        ...projectPositionRegisterDtoList,
        { position: data, projectRegisterUserDto: { no: null } },
      ]);
    },
    [
      setProjectPositionRegisterDtoList,
      setNumber,
      projectPositionRegisterDtoList,
      data,
    ]
  );
  const onDecrease = useCallback(
    (n: number) => () => {
      setNumber((cur) => cur - 1);
      for (const i of projectPositionRegisterDtoList) {
        if (i.positionNo === n) {
          projectPositionRegisterDtoList.pop();
          break;
        }
      }
    },
    [setNumber, projectPositionRegisterDtoList]
  );

  return (
    <>
      <Box>
        <Title>{data.positionName}</Title>
        <Cir onClick={onDecrease(data.positionNo)}>-</Cir>
        <p>
          {meNumber} / {number}
        </p>
        <Cir onClick={onUpdate()}>+</Cir>
      </Box>
    </>
  );
};

export default Position;
