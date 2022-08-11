import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
