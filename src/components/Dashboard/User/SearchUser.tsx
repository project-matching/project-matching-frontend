import UserSearchBar from '@/components/SearchBar/UserSearchBar';
import styled from '@emotion/styled';
import { SubTitle } from '../DashboardCommon';

const SearchUser = () => {
  return (
    <Container>
      <SubTitle>회원 검색</SubTitle>
      <UserSearchBar />
    </Container>
  );
};

export default SearchUser;

const Container = styled.div`
  margin-bottom: 20px;
`;
