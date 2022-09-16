import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserList } from 'src/redux/reducers/users';
import SearchButton from '../Buttons/Search/SearchButton';
import SmallButton from '../Buttons/SmallButton';

const Container = styled.div`
  margin: 50px 0;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d4d4d4;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  width: 300px;
  height: inherit;
  margin: 0 10px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState<'EMAIL' | 'NAME'>('EMAIL');

  const submitSearchKeyword = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchKeyword: { value: string };
    };

    const searchKeyword = target.searchKeyword.value;

    dispatch(getUserList({ content: searchKeyword, userFilter: searchFilter }));
  };

  return (
    <Container>
      <form onSubmit={submitSearchKeyword}>
        <SearchButton />
        <Input
          name="searchKeyword"
          placeholder="회원 이메일 또는 닉네임으로 검색하세요."
        />
      </form>
      <SmallButton
        onClick={() =>
          setSearchFilter(searchFilter === 'EMAIL' ? 'NAME' : 'EMAIL')
        }
      >
        {searchFilter === 'EMAIL' ? 'EMAIL' : 'NAME'}
      </SmallButton>
    </Container>
  );
};

export default UserSearchBar;
