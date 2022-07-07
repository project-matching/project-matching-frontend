import { Wrapper } from '@/styles/global';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { signIn, signOut } from 'redux/reducers/users';
import PrimaryButton from '../Buttons/PrimaryButton';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header: React.FC = () => {
  const Header = styled.header`
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 5px;
  `;

  const Nav = styled.nav`
    margin-left: 30px;
  `;

  const A = styled.a`
    margin: 10px;
    font-size: 18px;
  `;

  const { username } = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const openRecruitModal = () => {};

  // const openLoginModal = () => {};

  return (
    <Wrapper>
      <Header>
        <Flex>
          <Logo>Logo</Logo>
          <Nav>
            <Link href="/" passHref>
              <A>Home</A>
            </Link>
            <Link href="/recruiting" passHref>
              <A>Recruiting</A>
            </Link>
            <Link href="/in-service" passHref>
              <A>In-Service</A>
            </Link>
          </Nav>
        </Flex>
        <Flex>
          <PrimaryButton content="Recruit" clickEvent={openRecruitModal} />
          {username ? (
            <PrimaryButton
              content="Log Out"
              clickEvent={() => dispatch(signOut())}
            />
          ) : (
            <PrimaryButton
              content="Log In"
              clickEvent={() => dispatch(signIn())}
            />
          )}
        </Flex>
      </Header>
    </Wrapper>
  );
};

export default Header;
