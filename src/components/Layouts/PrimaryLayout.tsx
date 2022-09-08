import Head from 'next/head';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { Divider, Wrapper } from 'src/styles/global';
import Header from '../Common/Header';
import AuthModal from '../Modals/AuthModal';
import { Backdrop } from '../Modals/Backdrop';
import SignupEmailSentModal from '../Modals/SignupEmailSentModal';

export interface LayoutProps {
  children: React.ReactNode;
}

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
      {/* TODO: 중복 backdrop 수정하기 */}
      {Object.values(modal).some((v) => v) && (
        <Backdrop>
          {modal.AuthModal && <AuthModal />}
          {modal.SignupEmailSentModal && <SignupEmailSentModal />}
        </Backdrop>
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
