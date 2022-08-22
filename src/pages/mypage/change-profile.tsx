import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfileChange from '@/components/MyPage/MyProfileChange';
import { useAppSelector } from 'src/redux/hooks';

const data = {
  email: 'user1@test.com',
  github: 'https://fdsfasdf.com',
  image: '/default_profile.png',
  name: 'test user',
  position: 'Frontend',
  selfIntroduction:
    '안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라',
  sex: 'M',
  technicalStackList: ['TypeScript', 'React', 'JavaScript'],
};

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
