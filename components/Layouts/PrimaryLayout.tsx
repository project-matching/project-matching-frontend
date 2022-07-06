import { Divider, Wrapper } from '@/styles/global';
import { LayoutProps } from 'lib/type';
import Head from 'next/head';
import React from 'react';
import Header from '../Common/Header';

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
