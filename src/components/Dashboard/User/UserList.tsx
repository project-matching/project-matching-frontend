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
