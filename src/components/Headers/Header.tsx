import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { Wrapper } from 'src/styles/global';
import { dashboardPath, headerPath } from 'src/utils/path';
import { ROLE_ADMIN } from 'src/utils/userRole';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import LogoLink from '../Common/Logos/LogoLink';
import AuthModal from '../Common/Modals/AuthModal';
import SignupEmailSentModal from '../Common/Modals/SignupEmailSentModal';
import HeaderSearchBar from '../Common/SearchBar/HeaderSearchBar';
import Notification from './Notification';
import Profile from './Profile';

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
    font-size: ${fontSize.ml};
    color: ${(props) =>
      props.href === router.asPath ? colors.black : colors.gray200};
    font-weight: ${fontWeight.bold};
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
              <Link href={headerPath.home} passHref>
                <A>Home</A>
              </Link>
              <Link href={headerPath.recruiting} passHref>
                <A>Recruiting</A>
              </Link>
              <Link href={headerPath.recruited} passHref>
                <A>Recruited</A>
              </Link>
              {userInfo.role === ROLE_ADMIN && (
                <Link href={dashboardPath.dashboard} passHref>
                  <A>Dashboard</A>
                </Link>
              )}
            </Nav>
          </Flex>
          <Flex>
            {router.asPath !== headerPath.home && <HeaderSearchBar />}
            {userInfo.role !== ROLE_ADMIN && (
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
