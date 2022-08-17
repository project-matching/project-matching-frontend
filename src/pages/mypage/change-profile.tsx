import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import MyProfileChange from '@/components/MyPage/MyProfileChange';

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

/**
 * TODO:
 * 추가로 불러올 데이터
 * 1. 서비스에 있는 포지션
 * 2. 서비스에 있는 기술 스택
 *
 * 구현 사항
 * 1. dropdown (클릭 시 서버에서 불러움)
 * 2. Form 상태관리
 * 3. 프로필 업로드 시 미리보기
 * 4. 자기 소개는 200자 제한
 */

const MyPageChangeProfile = () => {
  return (
    <PrimaryLayout>
      <MyPageLayout>
        <MyProfileChange myProfile={data} />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageChangeProfile;
MyPageChangeProfile;
