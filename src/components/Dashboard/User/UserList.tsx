import SearchInfiniteScrollLayout from '@/components/Layouts/SearchInfiniteScrollLayout';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserList } from 'src/redux/reducers/users';
import { UserService } from 'src/services/UserService';
import UserCard from './UserCard';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const data = {
  content: [
    {
      userNo: 1014,
      image: null,
      name: '김윤건',
      email: 'ungun96@gmail.com',
      block: false,
    },
    {
      userNo: 1007,
      image: null,
      name: 'test user',
      email: 'project.matching.test.longeremail.this.longer@gmail.com',
      block: false,
    },
    {
      userNo: 1005,
      image: null,
      name: '이동연',
      email: 'project.matching.test.longeremail@gmail.com',
      block: false,
    },
    {
      userNo: 943,
      image: null,
      name: '김윤건',
      email: 'ungun96@naver.com',
      block: false,
    },
    {
      userNo: 615,
      image: null,
      name: 'admin',
      email: 'admin@test.com',
      block: false,
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
  const dispatch = useDispatch();
  const userList = useAppSelector((state) => state.user.userList);
  const userSearchKeyword = useAppSelector(
    (state) => state.user.userSearchKeyword
  );
  const [data, setData] = useState(
    userList || {
      content: [],
      last: true,
    }
  );

  useEffect(() => {
    (async () => {
      dispatch(getUserList({}));
    })();
  }, []);

  useEffect(() => {
    userList && setData(userList);
  }, [userList]);

  return (
    <>
      {data && (
        <SearchInfiniteScrollLayout
          api={UserService.getMoreUserList}
          data={data}
          setData={setData}
          content={userSearchKeyword}
          title="유저"
        >
          <Title>유저 리스트</Title>
          {!!data?.content.length &&
            data.content.map(({ userNo, ...userInfo }) => (
              <UserCard key={userNo} userInfo={{ ...userInfo, userNo }} />
            ))}
        </SearchInfiniteScrollLayout>
      )}
    </>
  );
};

export default UserList;
