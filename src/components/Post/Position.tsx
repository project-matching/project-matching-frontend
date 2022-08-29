import styled from '@emotion/styled';
import { FC, useCallback } from 'react';

const Cir = styled.div`
  background-color: black;
  width: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 10px;
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
  obj: any;
  setNpm: any;
  setNDesigner: any;
  setNFrontend: any;
  setNBackend: any;
  setNFullstack: any;
}

const Position: FC<Props> = ({
  obj,
  setNpm,
  setNDesigner,
  setNFrontend,
  setNBackend,
  setNFullstack,
}) => {
  const increase = useCallback(
    (name: string) => {
      if (name === 'Pm') {
        setNpm((cur: number) => cur + 1);
      } else if (name === 'Designer') {
        setNDesigner((cur: number) => cur + 1);
      } else if (name === 'Frontend') {
        setNFrontend((cur: number) => cur + 1);
      } else if (name === 'Backend') {
        setNBackend((cur: number) => cur + 1);
      } else setNFullstack((cur: number) => cur + 1);
    },
    [setNpm, setNDesigner, setNFrontend, setNBackend, setNFullstack]
  );

  const decrease = useCallback((name: string) => {
    if (name === 'Pm') {
      setNpm((cur: number) => cur - 1);
    } else if (name === 'Designer') {
      setNDesigner((cur: number) => cur - 1);
    } else if (name === 'Frontend') {
      setNFrontend((cur: number) => cur - 1);
    } else if (name === 'Backend') {
      setNBackend((cur: number) => cur - 1);
    } else setNFullstack((cur: number) => cur - 1);
  }, []);

  return (
    <>
      <Box>
        <Title>{obj[0]}</Title>
        <Cir onClick={() => decrease(obj[0])}>-</Cir>
        <p>0 / {obj[1]}</p>
        <Cir onClick={() => increase(obj[0])}>+</Cir>
      </Box>
    </>
  );
};

export default Position;
