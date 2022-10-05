import { NotificationType } from '@/components/Headers/Notification';
import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import { Backdrop } from '@/components/Modals/Backdrop';
import NotificationModal from '@/components/Modals/NotificationModal';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { notificationDetail } from 'src/redux/reducers/notification';
import { NotificationService } from 'src/services/NotificationService';
import PrimaryLayout from '../../components/Layouts/PrimaryLayout';

const Container = styled.div`
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 40px 0;
  font-weight: bold;
`;

const Section = styled.section`
  padding: 40px 50px;
  width: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d4d4d4;
`;

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
`;

const data = [
  {
    notificationNo: 1004,
    title:
      '[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name[프로젝트 참가 신청] project21 name',
    read: false,
    createDate: '2022-08-25T13:21:52',
  },
  {
    notificationNo: 1004,
    title: '[프로젝트 참가 신청] project21 name',
    read: true,
    createDate: '2022-08-25T13:21:52',
  },
  {
    notificationNo: 1004,
    title: '[프로젝트 참가 신청] project21 name',
    read: false,
    createDate: '2022-08-25T13:21:52',
  },
  {
    notificationNo: 1004,
    title: '[프로젝트 참가 신청] project21 name',
    read: false,
    createDate: '2022-08-25T13:21:52',
  },
  {
    notificationNo: 1004,
    title: '[프로젝트 참가 신청] project21 name',
    read: true,
    createDate: '2022-08-25T13:21:52',
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState<
    fetchedData<NotificationType>
  >({ content: [], last: false });
  const dispatch = useDispatch();
  const notificationModal = useAppSelector(
    (state) => state.modal.NotificationModal
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const openNotificationModal = (notification: NotificationType) => {
    dispatch(notificationDetail(notification.notificationNo));
    dispatch(openModal('NotificationModal'));
  };

  useEffect(() => {
    try {
      userInfo.no &&
        (async () => {
          setNotifications(await NotificationService.getNotification());
        })();
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
      // TODO: 로그인을 해주세요.
    }
  }, [userInfo.no]);

  return (
    <PrimaryLayout>
      {userInfo.no && notifications.content.length && (
        <Container>
          <Title>알림</Title>
          <Section>
            <InfiniteScrollLayout
              api={NotificationService.getNotification}
              data={notifications}
              setData={setNotifications}
              title="알림"
            >
              {notifications.content.map((notification) => (
                <Article
                  key={notification.notificationNo}
                  read={notification.read}
                  onClick={() => openNotificationModal(notification)}
                >
                  <CreatedDate>{notification.createDate}</CreatedDate>
                  <ArticleContnet>{notification.title}</ArticleContnet>
                  <Read>{notification.read ? `읽음` : '안 읽음'}</Read>
                </Article>
              ))}
            </InfiniteScrollLayout>
          </Section>
        </Container>
      )}
      {notificationModal && (
        <Backdrop>
          <NotificationModal />
        </Backdrop>
      )}
    </PrimaryLayout>
  );
};

export default Notification;
