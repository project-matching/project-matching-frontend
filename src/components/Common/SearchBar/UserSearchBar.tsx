import SearchButton from '@/components/Common/Buttons/Search/SearchButton';
import SmallButton from '@/components/Common/Buttons/SmallButton';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserList } from 'src/redux/reducers/users';

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

const Container = styled.div`
  margin: 50px 0;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  background-color: white;

  > form {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
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
