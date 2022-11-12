import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import CloseButton from '../Buttons/CloseButton';
import Logo from '../Logos/Logo';
import { Backdrop } from './Backdrop';

const Container = styled.div`
  width: 500px;
  background-color: white;
  z-index: 1000;
`;
const Head = styled.div`
  margin: 20px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  margin: 20px 45px;
`;

interface LocalModalLayoutProps {
  children: React.ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const LocalModalLayout = ({ onClose, children }: LocalModalLayoutProps) => {
  const closeLocalModalLayout = () => {
    onClose(false);
  };

  return (
    <Backdrop>
      <Container>
        <Head>
          <div>
            <Logo />
          </div>
          <CloseButton onClick={closeLocalModalLayout} />
        </Head>
        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

export default LocalModalLayout;
