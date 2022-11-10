import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import Image from 'next/image';
import githubLogo from 'public/github_logo.png';
import googleLogo from 'public/google_logo.png';
import React from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid ${colors.gray300};
  border-radius: 3px;
  box-shadow: 0px 2px 2px ${colors.gray300};
  cursor: pointer;
  margin-top: 10px;

  &:active {
    background-color: ${colors.gray300};
  }
`;

const Text = styled.span`
  font-size: ${fontSize.m};
  color: ${colors.gray800};
  font-weight: ${fontWeight.bold};
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
