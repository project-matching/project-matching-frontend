import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserList } from 'src/redux/reducers/users';
import SearchButton from '../Buttons/Search/SearchButton';

const Container = styled.div`
  margin: 50px 0;
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

const UserSearchBar = () => {
  const dispatch = useDispatch();

  const submitSearchKeyword = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchKeyword: { value: string };
    };

    const searchKeyword = target.searchKeyword.value;

    dispatch(getUserList({ content: searchKeyword }));
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
    </Container>
  );
};

export default UserSearchBar;
