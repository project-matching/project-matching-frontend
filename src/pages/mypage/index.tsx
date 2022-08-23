import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfile from '@/components/MyPage/MyProfile';
import { useAppSelector } from 'src/redux/hooks';

/**
 * TODO:
 * 구현 사항
 * 비로그인 시 접근 불가 -> 홈으로 리다이렉트
 */

const MyPage = () => {
  const userProfile = useAppSelector((state) => state.user.userProfile);

  return (
    <PrimaryLayout>
      <MyPageLayout>
        <MyProfile myProfile={userProfile} />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPage;
