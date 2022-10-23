import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { Wrapper } from 'src/styles/global';
import PrimaryButton from '../Buttons/PrimaryButton';
import Notification from '../Headers/Notification';
import Profile from '../Headers/Profile';
import AuthModal from '../Modals/AuthModal';
import SignupEmailSentModal from '../Modals/SignupEmailSentModal';
import HeaderSearchBar from '../SearchBar/HeaderSearchBar';
import LogoLink from './LogoLink';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: 30px;
`;

const HeaderContainer = styled.header`
  display: flex;
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const Header: React.FC = () => {
  const router = useRouter();

  const A = styled.a`
    margin: 10px;
    font-size: 18px;
    color: ${(props) =>
      props.href === router.asPath
        ? props.theme.colors.black
        : props.theme.colors.gray};
    font-weight: bold;
  `;

  const userInfo = useAppSelector((state) => state.user.userInfo);
  const authModal = useAppSelector((state) => state.modal.AuthModal);
  const signupEmailSentModal = useAppSelector(
    (state) => state.modal.SignupEmailSentModal
  );
  const dispatch = useDispatch();

  const openRecruitModal = () => {
    if (!userInfo.no) {
      dispatch(openModal('AuthModal'));
      return;
    }

    router.push('/project/upload');
  };

  const openAuthModal = () => {
    dispatch(openModal('AuthModal'));
  };

  return (
    <>
      <Wrapper>
        <HeaderContainer>
          <Flex>
            <LogoLink />
            <Nav>
              <Link href="/" passHref>
                <A>Home</A>
              </Link>
              <Link href="/recruiting" passHref>
                <A>Recruiting</A>
              </Link>
              <Link href="/recruited" passHref>
                <A>Recruited</A>
              </Link>
              {userInfo.role === 'ROLE_ADMIN' && (
                <Link href="/dashboard" passHref>
                  <A>Dashboard</A>
                </Link>
              )}
            </Nav>
          </Flex>
          <Flex>
            {router.asPath !== '/' && <HeaderSearchBar />}
            {userInfo.role !== 'ROLE_ADMIN' && (
              <PrimaryButton onClick={openRecruitModal}>
                새 프로젝트
              </PrimaryButton>
            )}
            {userInfo.no ? (
              <>
                <Notification />
                <Profile />
              </>
            ) : (
              <PrimaryButton onClick={openAuthModal}>로그인</PrimaryButton>
            )}
          </Flex>
        </HeaderContainer>
      </Wrapper>

      {authModal && <AuthModal />}
      {signupEmailSentModal && <SignupEmailSentModal />}
    </>
  );
};

export default Header;
