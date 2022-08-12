import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signOut } from 'src/redux/reducers/auth';
import SmallButton from '../Buttons/SmallButton';

// TODO: 후추 저작권 없는 이미지로 변경
export const DEFAULT_IMAGE: string = '/default_profile.png';

const ImageContainer = styled.div``;

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 10px;
  width: 150px;
  background-color: white;
  border: 1px solid #d4d4d4;
  padding: 10px 10px 5px;
  z-index: 2;
  font-size: ${(props) => props.theme.sizes.m};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d4d4d4;
  padding: 10px 5px;
  margin-bottom: 10px;
  span {
    margin-bottom: 10px;
    &:last-child {
      margin: 0;
    }
  }
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Span = styled.span`
  font-size: ${(props) => props.theme.sizes.sm};
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isOpen, setOpen] = useState(false);
  const dropdownEl = useRef<HTMLDivElement>(null);

  const {
    name,
    email,
    position,
    image,
    technicalStackDtoList: techStacks,
  } = userInfo;

  const Container = styled.div`
    width: 40px;
    height: 40px;
    margin-left: 10px;
    position: relative;

    > ${Dropdown} {
      visibility: ${isOpen ? 'visible' : 'hidden'};
    }
  `;

  const handleCloseDropdown = (e: Event) => {
    if (isOpen && !dropdownEl.current?.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    isOpen ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseDropdown);

    return () => {
      window.removeEventListener('click', handleCloseDropdown);
    };
  });

  return (
    <Container>
      <ImageContainer onClick={toggleDropdown}>
        <Image
          src={image ?? DEFAULT_IMAGE}
          alt="profile_image"
          width="40px"
          height="40px"
          style={{
            borderRadius: '50%',
          }}
        />
      </ImageContainer>
      <Dropdown ref={dropdownEl}>
        <UserInfo>
          <Title>내 정보</Title>
          <Span>이름: {name ?? '없음'}</Span>
          {/* <Span>{email ?? '없음'}</Span> */}
          <Span>포지션: {position ?? '없음'}</Span>
          <Span>기술스택: {techStacks?.length ? '있음' : '없음'}</Span>
        </UserInfo>
        <LinkContainer>
          <Link href="/myproject">
            <SmallButton>내 프로젝트</SmallButton>
          </Link>
          <Link href="/bookmark">
            <SmallButton>즐겨찾기</SmallButton>
          </Link>
          <Link href="/mypage">
            <SmallButton>내 프로필</SmallButton>
          </Link>
          <SmallButton gray onClick={() => dispatch(signOut())}>
            Log Out
          </SmallButton>
        </LinkContainer>
      </Dropdown>
    </Container>
  );
};

export default Profile;
