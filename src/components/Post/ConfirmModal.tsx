import styled from '@emotion/styled';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';

const Box = styled.div`
  width: 300px;
  height: 200px;
  background-color: gray;
  z-index: 999;
  position: fixed;
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
  setOnModal: Dispatch<SetStateAction<boolean>>;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}
const ConfirmModal: FC<Props> = ({ title, setOnModal, setIsReady }) => {
  const useOk = useCallback(() => {
    setIsReady(true);
  }, [setIsReady]);

  const useNo = useCallback(() => {
    setIsReady(false);
    setOnModal(false);
    document.body.style.overflow = "auto";
  }, [setIsReady]);

  return (
    <Box>
      <h1>{title}</h1>
      <BtnWrapper>
        <Btn onClick={useOk} type="button">예</Btn>
        <Btn onClick={useNo} type="button">아니요</Btn>
      </BtnWrapper>
    </Box>
  );
};

export default ConfirmModal;
