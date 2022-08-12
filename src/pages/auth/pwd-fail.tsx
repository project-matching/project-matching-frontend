import PrimaryButton from '@/components/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import Link from 'next/link';

const Fail = () => {
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

  return (
    <Wrapper>
      <Heading>이메일 인증 유효기간이 만료되었습니다.</Heading>
      <Desc>이메일 전송을 다시 시도해주세요.</Desc>
      <ButtonContainer>
        <Link href="/">
          <PrimaryButton>메인 화면으로 이동하기</PrimaryButton>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Fail;
