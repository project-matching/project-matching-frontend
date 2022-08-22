import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfileChange from '@/components/MyPage/MyProfileChange';
import { useAppSelector } from 'src/redux/hooks';

const MyPageChangeProfile = () => {
  const userProfile = useAppSelector((state) => state.user.userProfile);

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
