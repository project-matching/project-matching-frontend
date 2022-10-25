import SearchInfiniteScrollLayout from '@/components/Layouts/SearchInfiniteScrollLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserList } from 'src/redux/reducers/users';
import { UserService } from 'src/services/UserService';
import { SubTitle } from '../DashboardCommon';
import UserCard from './UserCard';

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
    dispatch(getUserList({}));
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
          content={userSearchKeyword!?.content}
          filter={userSearchKeyword!?.userFilter}
          title="유저"
        >
          <SubTitle>유저 리스트</SubTitle>
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
