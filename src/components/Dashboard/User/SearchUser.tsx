import UserSearchBar from '@/components/SearchBar/UserSearchBar';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const SearchUser = () => {
  return (
    <Container>
      <Title>회원 검색</Title>
      <UserSearchBar />
    </Container>
  );
};

export default SearchUser;
