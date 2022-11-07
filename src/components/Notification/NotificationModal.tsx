import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import LocalModalLayout from '../Common/Modals/LocalModalLayout';
import { NotificationDetail } from './NotificationArticle';

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

interface PropTypes {
  notificationDetail: NotificationDetail;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const NotificationModal = ({ notificationDetail, setModal }: PropTypes) => {
  const closeNotificationModal = () => {
    setModal(false);
  };
  return (
    <LocalModalLayout onClose={closeNotificationModal}>
      <Content>
        <Head>
          <h1>{notificationDetail.title}</h1>
          <span>{notificationDetail.createDate}</span>
        </Head>
        <p>{notificationDetail.content}</p>
      </Content>
      <PrimaryButton onClick={closeNotificationModal} wFull>
        확인
      </PrimaryButton>
    </LocalModalLayout>
  );
};

export default NotificationModal;
