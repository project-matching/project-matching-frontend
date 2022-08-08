import PrimaryButton from '@/components/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useAppSelector } from 'src/redux/hooks';

const Welcome = () => {
  const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Heading = styled.h1`
    font-size: ${(props) => props.theme.sizes.xl};
    font-weight: bold;
  `;

  const Desc = styled.p`
    margin: 7rem 0;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;

  /**
   * 회원가입 환영메세지
   *
   * TODO:
   * 1. 저장된 토큰으로 유저정보 불러오기
   * 2. 추가 정보 입력 이동
   */

  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <Wrapper>
      <Heading>{userInfo?.name}님 가입을 환영합니다!</Heading>
      <Desc>프로젝트 참가율을 높이기 위해 추가 정보를 입력해주세요.</Desc>
      <ButtonContainer>
        <Link href="/user/detail">
          <PrimaryButton>추가정보 입력하러 가기</PrimaryButton>
        </Link>
        <Link href="/">
          <PrimaryButton>메인 화면으로 이동하기</PrimaryButton>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Welcome;
