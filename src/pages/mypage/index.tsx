import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfile from '@/components/MyPage/MyProfile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserProfile } from 'src/redux/reducers/users';

const MyPage = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <MyPageLayout>
          <MyProfile myProfile={userProfile} />
        </MyPageLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyPage;
