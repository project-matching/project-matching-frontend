import Head from 'next/head';
import React from 'react';
import { Divider, Wrapper } from 'src/styles/global';
import Header from '../../Headers/Header';

export interface LayoutProps {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<LayoutProps> = ({ children }) => {
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
      <Header />
      <Divider />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
    </>
  );
};

export default PrimaryLayout;
