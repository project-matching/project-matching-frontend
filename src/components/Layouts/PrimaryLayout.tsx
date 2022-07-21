import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import { LayoutProps } from 'src/lib/type';
import { useAppSelector } from 'src/redux/hooks';
import { Divider, Wrapper } from 'src/styles/global';
import Header from '../Common/Header';
import LoginModal from '../Modals/LoginModal';
import RecruitModal from '../Modals/RecruitModal';

export const ModalContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
`;

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

const PrimaryLayout: React.FC<LayoutProps> = ({ children }) => {
  const { modal } = useAppSelector((state) => state);
  return (
    <>
      <Head>
        <title>Project Matching</title>
        <meta
          name="description"
          content="Team matching service for your side project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {modal.LoginModal && (
        <ModalContainer>
          <Backdrop>
            <LoginModal />
          </Backdrop>
        </ModalContainer>
      )}
      {modal.RecruitModal && (
        <ModalContainer>
          <Backdrop>
            <RecruitModal />
          </Backdrop>
        </ModalContainer>
      )}

      <Header />
      <Divider />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
    </>
  );
};

export default PrimaryLayout;
