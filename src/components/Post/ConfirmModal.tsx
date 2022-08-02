import styled from '@emotion/styled';
import { FC, useCallback } from 'react';

const Box = styled.div`
  width: 300px;
  height: 200px;
  background-color: gray;
  z-index: 999;
  position: absolute;
  left: 30%;
  h1 {
    text-align: center;
    padding: 50px 0px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  padding: 5px 0px;
  border: none;
  width: 70px;
  margin: 0 10px;
`;

interface Props {
  title: string;
  setOk: any;
}
const ConfirmModal: FC<Props> = ({ title, setOk }) => {
  const useOk = useCallback(() => {
    setOk(true);
  }, [setOk]);
  const useNo = useCallback(() => {
    setOk(false);
  }, [setOk]);
  return (
    <Box>
      <h1>{title}</h1>
      <BtnWrapper>
        <Btn onClick={useOk}>예</Btn>
        <Btn onClick={useNo}>아니요</Btn>
      </BtnWrapper>
    </Box>
  );
};

export default ConfirmModal;
