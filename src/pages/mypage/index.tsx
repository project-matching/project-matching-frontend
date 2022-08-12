import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfile from '@/components/MyPage/MyProfile';

const data = {
  email: 'user1@test.com',
  github: 'https://fdsfasdf.com',
  image: '/default_profile.png',
  name: 'test user',
  position: 'PM',
  selfIntroduction:
    '안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라안녕하세요 블라블라',
  sex: 'F',
  technicalStackList: ['TypeScript', 'React', 'JavaScript', 'HTML5', 'CSS3'],
};

/**
 * TODO:
 * 구현 사항
 * 1. 비로그인 시 접근 불가 -> 홈으로 리다이렉트
 * 2. 실제 데이터 불러오기
 */

const MyPage = () => {
  return (
    <PrimaryLayout>
      <MyPageLayout>
        <MyProfile myProfile={data} />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPage;
