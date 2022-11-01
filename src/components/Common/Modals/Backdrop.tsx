import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
