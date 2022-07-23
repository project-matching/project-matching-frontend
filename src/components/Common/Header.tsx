import styled from '@emotion/styled';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signOut } from 'src/redux/reducers/auth';
import { openModal } from 'src/redux/reducers/modals';
import { Wrapper } from 'src/styles/global';
import PrimaryButton from '../Buttons/PrimaryButton';
import Logo from './Logo';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header: React.FC = () => {
  const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const Nav = styled.nav`
    margin-left: 30px;
  `;

  const A = styled.a`
    margin: 10px;
    font-size: 18px;
  `;

  const { token } = useAppSelector((state) => state.auth);
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
            </Nav>
          </Flex>
          <Flex>
            <PrimaryButton onClick={openRecruitModal}>Recruit</PrimaryButton>
            {token ? (
              <PrimaryButton onClick={() => dispatch(signOut())}>
                Log Out
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={openAuthModal}>Log In</PrimaryButton>
            )}
          </Flex>
        </Header>
      </Wrapper>
    </>
  );
};

export default Header;
