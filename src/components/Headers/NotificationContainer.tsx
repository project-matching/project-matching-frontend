import { colors, fontSize } from '@/styles/theme';
import styled from '@emotion/styled';
import { useState } from 'react';
import { NotificationService } from 'src/services/NotificationService';
import { NotificationDetail } from '../Notification/NotificationArticle';
import NotificationModal from '../Notification/NotificationModal';
import { NotificationType } from './Notification';

interface NotificationStyleType {
  read?: boolean;
}

const Container = styled.a<NotificationStyleType>`
  color: ${(props) => (props.read ? colors.gray200 : colors.black)};
  width: inherit;
  font-size: ${fontSize.sm};
  overflow: hidden;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.2;

  &:visited {
    color: ${colors.gray200};
  }
`;

interface PropTypes {
  notification: NotificationType;
}

const NotificationContainer = ({ notification }: PropTypes) => {
  const [isOpen, setOpen] = useState(false);
  const [isRead, setRead] = useState(notification.read);
  const [notificationDetail, setNotificationDetail] =
    useState<NotificationDetail | null>(null);

  const openNotificationModal = async (notificationNo: number) => {
    try {
      const detail: NotificationDetail =
        await NotificationService.getNotificationDetail(notificationNo);
      setNotificationDetail(detail);
      !isRead && setRead(true);
    } catch (error) {
      // TODO: 에러처리
    } finally {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        read={isRead}
        onClick={() => openNotificationModal(notification.notificationNo)}
      >
        {notification.title}
      </Container>
      {isOpen && notificationDetail && (
        <NotificationModal
          notificationDetail={notificationDetail}
          setModal={setOpen}
        />
      )}
    </>
  );
};

export default NotificationContainer;
