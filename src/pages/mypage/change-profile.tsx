import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfileChange from '@/components/MyPage/MyProfileChange';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserProfile } from 'src/redux/reducers/users';

const MyPageChangeProfile = () => {
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <PrimaryLayout>
      <MyPageLayout>
        <MyProfileChange myProfile={userProfile} />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageChangeProfile;
MyPageChangeProfile;
