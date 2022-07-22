import styled from '@emotion/styled';
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

const LogoImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 24px;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.sizes.m};
  color: #888;
  font-weight: bold;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
`;

interface OAuthButtonType {
  onClick: (_e: React.MouseEvent<HTMLDivElement>) => void;
  serviceProvider: string;
  content: string;
}

const OAuthButton = ({
  onClick,
  serviceProvider,
  content,
}: OAuthButtonType) => {
  return (
    <Container onClick={onClick}>
      <LogoImg
        src={`/${serviceProvider}_logo.png`}
        alt={`${serviceProvider}_logo`}
      />
      <Text>{content}</Text>
    </Container>
  );
};

export default OAuthButton;
