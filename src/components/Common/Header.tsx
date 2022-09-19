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
import Logo from './Logo';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: 30px;
`;

const Header: React.FC = () => {
  const router = useRouter();

  const Header = styled.header`
    display: flex;
    height: 55px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  `;

  const A = styled.a`
    margin: 10px;
    font-size: 18px;
    color: ${(props) =>
      props.href === router.asPath
        ? props.theme.colors.black
        : props.theme.colors.gray};
    font-weight: bold;
  `;

  const { token } = useAppSelector((state) => state.auth);
  const { role } = useAppSelector((state) => state.user.userInfo);
  const authModal = useAppSelector((state) => state.modal.AuthModal);
  const signupEmailSentModal = useAppSelector(
    (state) => state.modal.SignupEmailSentModal
  );
  const dispatch = useDispatch();

  const openRecruitModal = () => {
    dispatch(openModal('RecruitModal'));
  };

  const openAuthModal = () => {
    dispatch(openModal('AuthModal'));
  };

  return (
    <>
      <Wrapper>
        <Header>
          <Flex>
            <Logo />
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
              {role === 'ROLE_ADMIN' && (
                <Link href="/dashboard" passHref>
                  <A>Dashboard</A>
                </Link>
              )}
            </Nav>
          </Flex>
          <Flex>
            {router.asPath !== '/' && <HeaderSearchBar />}
            {role !== 'ROLE_ADMIN' && (
              <PrimaryButton onClick={openRecruitModal}>Recruit</PrimaryButton>
            )}
            {token ? (
              <>
                <Notification />
                <Profile />
              </>
            ) : (
              <PrimaryButton onClick={openAuthModal}>Log In</PrimaryButton>
            )}
          </Flex>
        </Header>
      </Wrapper>

      {authModal && <AuthModal />}
      {signupEmailSentModal && <SignupEmailSentModal />}
    </>
  );
};

export default Header;
