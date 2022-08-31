import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { closeModal } from 'src/redux/reducers/components/modals';
import { notificationSuccess } from 'src/redux/reducers/notification';
import PrimaryButton from '../Buttons/PrimaryButton';
import ModalLayout from './ModalLayout';

const Content = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;

  > p {
    line-height: 1.5;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 15px;

  > h1 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  > span {
    font-size: ${(props) => props.theme.sizes.sm};
    font-weight: normal;
  }
`;

const NotificationModal = () => {
  const dispatch = useDispatch();
  const notificationDetail = useAppSelector(
    (state) => state.notification.notificationDetail
  );

  const closeNotificationModal = () => {
    dispatch(notificationSuccess(null));
    dispatch(closeModal('NotificationModal'));
  };

  return (
    <ModalLayout modalContent="NotificationModal">
      {notificationDetail && (
        <Content>
          <Head>
            <h1>{notificationDetail.title}</h1>
            <span>{notificationDetail.createDate}</span>
          </Head>
          <p>{notificationDetail.content}</p>
        </Content>
      )}
      <PrimaryButton onClick={closeNotificationModal} wFull>
        확인
      </PrimaryButton>
    </ModalLayout>
  );
};

export default NotificationModal;
