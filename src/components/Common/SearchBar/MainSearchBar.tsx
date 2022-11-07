import ProjectStateButton from '@/components/Common/Buttons/Search/ProjectStateButton';
import SearchButton from '@/components/Common/Buttons/Search/SearchButton';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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

    > form {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
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
  const router = useRouter();

  const submitSearchKeyword = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchKeyword: { value: string };
    };

    const searchKeyword = target.searchKeyword.value;

    router.push({
      pathname: '/results',
      query: { keyword: searchKeyword, state: isRecruiting },
    });
  };

  return (
    <Container>
      <form onSubmit={submitSearchKeyword}>
        <SearchButton />
        <Input
          name="searchKeyword"
          placeholder="프로젝트명 또는 내용으로 원하는 프로젝트를 검색하세요."
        />
      </form>
      <ProjectStateButton state={isRecruiting} setRecruiting={setRecruiting} />
    </Container>
  );
};

export default MainSearchBar;
