import styled from '@emotion/styled';
import { useState } from 'react';
import { NotificationService } from 'src/services/NotificationService';
import { NotificationType } from '../Headers/Notification';
import NotificationModal from './NotificationModal';

const Article = styled.a<{ read: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: 1.5fr 7fr 1fr;
  gap: 20px;
  padding: 10px;
  margin-bottom: 30px;
  color: ${(props) =>
    props.read ? props.theme.colors.darkGray : props.theme.colors.black};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const CreatedDate = styled.h3`
  font-size: ${(props) => props.theme.sizes.sm};
  vertical-align: center;
`;

const Read = styled.h3`
  font-size: ${(props) => props.theme.sizes.sm};
  vertical-align: center;
`;

const ArticleContnet = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
`;

interface PropTypes {
  notification: NotificationType;
}

export interface NotificationDetail {
  createDate: string;
  notificationNo: number;
  read: boolean;
  title: string;
  content: string;
}

const NotificationArticle = ({ notification }: PropTypes) => {
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
      <Article
        read={isRead}
        onClick={() => openNotificationModal(notification.notificationNo)}
      >
        <CreatedDate>{notification.createDate}</CreatedDate>
        <ArticleContnet>{notification.title}</ArticleContnet>
        <Read>{isRead ? `읽음` : '안 읽음'}</Read>
      </Article>
      {isOpen && notificationDetail && (
        <NotificationModal
          notificationDetail={notificationDetail}
          setModal={setOpen}
        />
      )}
    </>
  );
};

export default NotificationArticle;
