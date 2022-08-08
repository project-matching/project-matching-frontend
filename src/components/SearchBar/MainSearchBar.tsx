import styled from '@emotion/styled';
import { useState } from 'react';
import SmallButton from '../Buttons/SmallButton';

const MainSearchBar = () => {
  const Container = styled.div`
    margin: 50px auto;
    width: fit-content;
    height: 40px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #d4d4d4;
    background-color: white;
  `;

  const Input = styled.input`
    border: none;
    width: 400px;
    height: inherit;
    margin: 0 10px;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  `;

  const [isRecruiting, setRecruiting] = useState(false);

  return (
    <Container>
      <i>ICON</i>
      <Input placeholder="프로젝트명 또는 내용으로 원하는 프로젝트를 검색하세요." />
      <SmallButton onClick={() => setRecruiting(!isRecruiting)}>
        {isRecruiting ? '모집완료' : '모집중'}
      </SmallButton>
    </Container>
  );
};

export default MainSearchBar;
