import styled from '@emotion/styled';
import Image from 'next/image';
import githubLogo from 'public/github_logo.png';
import googleLogo from 'public/google_logo.png';
import React from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  box-shadow: 0px 2px 2px #d4d4d47f;
  cursor: pointer;
  margin-top: 10px;

  &:active {
    background-color: #d4d4d4;
  }
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.sizes.m};
  color: #888;
  font-weight: bold;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  margin-left: 24px;
`;

interface OAuthButtonType {
  onClick: (_e: React.MouseEvent<HTMLDivElement>) => void;
  serviceProvider: string;
  content: string;
}

// TODO: 이미지 소스 props로 전달 받기

const OAuthButton = ({
  onClick,
  serviceProvider,
  content,
}: OAuthButtonType) => {
  return (
    <Container onClick={onClick}>
      <Image
        src={serviceProvider === 'google' ? googleLogo : githubLogo}
        alt={serviceProvider === 'google' ? 'google_logo' : 'github_logo'}
        width="18px"
        height="18px"
      />
      <Text>{content}</Text>
    </Container>
  );
};

export default OAuthButton;
