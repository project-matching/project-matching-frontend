import PrimaryButton from '@/components/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserInfo } from 'src/redux/reducers/users';

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

const Welcome = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  });

  return (
    <Wrapper>
      <Heading>{userInfo?.name}님 가입을 환영합니다!</Heading>
      <Desc>프로젝트 참가율을 높이기 위해 추가 정보를 입력해주세요.</Desc>
      <ButtonContainer>
        <Link href="/mypage/change-profile">
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
