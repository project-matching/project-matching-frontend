import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Common/Layouts/InfiniteScrollLayout';
import { NotificationType } from '@/components/Headers/Notification';
import NotificationArticle from '@/components/Notification/NotificationArticle';
import { colors, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { NotificationService } from 'src/services/NotificationService';
import PrimaryLayout from '../../components/Common/Layouts/PrimaryLayout';

const Container = styled.div`
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 40px 0;
  font-weight: ${fontWeight.bold};
`;

const Section = styled.section`
  padding: 40px 50px;
  width: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray300};
`;

const Notification = () => {
  const [notifications, setNotifications] = useState<
    fetchedData<NotificationType>
  >({ content: [], last: false });

  const userInfo = useAppSelector((state) => state.user.userInfo);

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
                <NotificationArticle
                  key={notification.notificationNo}
                  notification={notification}
                />
              ))}
            </InfiniteScrollLayout>
          </Section>
        </Container>
      )}
    </PrimaryLayout>
  );
};

export default Notification;
