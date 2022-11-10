import SmallButton from '@/components/Common/Buttons/SmallButton';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signOut } from 'src/redux/reducers/auth';
import ImageToggle from '../Common/ToggleDropdown/ImageToggle';

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 10px;
  width: 150px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray300};
  padding: 10px 10px 5px;
  z-index: 2;
  font-size: ${fontSize.m};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray300};
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
  font-weight: ${fontWeight.bold};
`;

const Span = styled.span`
  font-size: ${fontSize.sm};
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
    role,
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
    if (
      isOpen &&
      dropdownEl.current &&
      !dropdownEl.current.contains(e.target as Element)
    ) {
      setOpen(false);
    }
  };

  const toggleDropdown = () => {
    // e.nativeEvent.stopPropagation();
    setOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleCloseDropdown);

    return () => {
      window.removeEventListener('mousedown', handleCloseDropdown);
    };
  });

  return (
    <Container ref={dropdownEl}>
      <ImageToggle
        image={image}
        alt="profile_image"
        borderRadius={true}
        toggleDropdown={toggleDropdown}
      />
      <Dropdown>
        {role !== 'ROLE_ADMIN' ? (
          <>
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
            </LinkContainer>
          </>
        ) : (
          <UserInfo>
            <Title>내 정보</Title>
            <Span>이름: {name ?? '없음'}</Span>
            {/* <Span>{email ?? '없음'}</Span> */}
          </UserInfo>
        )}
        <LinkContainer>
          <SmallButton gray onClick={() => dispatch(signOut())}>
            Log Out
          </SmallButton>
        </LinkContainer>
      </Dropdown>
    </Container>
  );
};

export default Profile;
