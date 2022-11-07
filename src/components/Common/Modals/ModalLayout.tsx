import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import {
  closeModal,
  ModalActionProps,
} from 'src/redux/reducers/components/modals';
import { removeSigninErrorMsg } from 'src/redux/reducers/components/validation';
import Logo from '../Logos/Logo';
import { Backdrop } from './Backdrop';

const Container = styled.div`
  width: 350px;
  background-color: white;
  z-index: 1000;
`;
const Head = styled.div`
  margin: 20px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const A = styled.a`
  font-weight: bold;
  cursor: pointer;
`;

const Body = styled.div`
  margin: 20px 45px;
`;

interface ModalLayoutProps {
  modalContent: ModalActionProps;
  children: React.ReactNode;
}

const ModalLayout = ({ modalContent, children }: ModalLayoutProps) => {
  const dispatch = useDispatch();

  const closeModalLayout = () => {
    dispatch(removeSigninErrorMsg());
    dispatch(closeModal(modalContent));
  };

  return (
    <Backdrop>
      <Container>
        <Head>
          <div>
            <Logo />
          </div>
          <A onClick={closeModalLayout}>X</A>
        </Head>
        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

export default ModalLayout;
