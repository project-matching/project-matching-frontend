import styled from '@emotion/styled';
import UserCard from './UserCard';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const data = {
  content: [
    {
      email: 'user1@test.com',
      image: null,
      name: 'User1',
      userNo: 0,
    },
    {
      email: 'user2@test.com',
      image: null,
      name: 'User2',
      userNo: 1,
    },
    {
      email: 'user3@test.com',
      image: null,
      name: 'User3',
      userNo: 2,
    },
  ],
  last: true,
};

/**
 * TODO:
 * 전역변수 User 추가
 * User 리스트 불러오기
 */

const UserList = () => {
  return (
    <>
      <Title>유저 리스트</Title>
      {data.content.map(({ userNo, ...userInfo }) => (
        <UserCard key={userNo} userInfo={userInfo} />
      ))}
    </>
  );
};

export default UserList;
