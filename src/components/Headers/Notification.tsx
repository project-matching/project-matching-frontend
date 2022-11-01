import styled from '@emotion/styled';
import Link from 'next/link';
import notificationImage from 'public/notification.png';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { NotificationService } from 'src/services/NotificationService';
import ImageToggle from '../Common/ToggleDropdown/ImageToggle';
import NotificationContainer from './NotificationContainer';

const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 10px;
  width: 200px;
  background-color: white;
  border: 1px solid #d4d4d4;
  padding: 10px 10px 5px;
  z-index: 2;
  font-size: ${(props) => props.theme.sizes.m};
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > a:last-child {
    font-size: ${(props) => props.theme.sizes.sm};
    margin: 5px 0;
    text-align: center;
  }
`;

export interface NotificationType {
  notificationNo: number;
  title: string;
  read: boolean;
  createDate: string;
}

const Notification = () => {
  const [notificationPreview, setNotificationPreview] = useState<
    NotificationType[] | null
  >(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [isOpen, setOpen] = useState(false);

  const Container = styled.div`
    width: 25px;
    height: 25px;
    margin: 0 10px;
    position: relative;

    > ${Dropdown} {
      visibility: ${isOpen ? 'visible' : 'hidden'};
    }
  `;

  const dropdownEl = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = (e: Event) => {
    if (
      isOpen &&
      dropdownEl.current &&
      !dropdownEl.current.contains(e.target as Element)
    ) {
      setOpen(false);
    }
  };

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleCloseDropdown);

    return () => {
      window.removeEventListener('mousedown', handleCloseDropdown);
    };
  });

  useEffect(() => {
    userInfo.no &&
      isOpen &&
      (async () =>
        setNotificationPreview(
          await NotificationService.getNotificationPreview()
        ))();
  }, [userInfo.no, isOpen]);

  return (
    <Container ref={dropdownEl}>
      <ImageToggle
        image={notificationImage}
        alt="notification_image"
        toggleDropdown={toggleDropdown}
      />
      <Dropdown>
        <LinkContainer>
          {notificationPreview &&
            notificationPreview.map((notification) => (
              <NotificationContainer
                key={notification.notificationNo}
                notification={notification}
              />
            ))}
          <Link href="/notification" passHref>
            <a>알림 더보기</a>
          </Link>
        </LinkContainer>
      </Dropdown>
    </Container>
  );
};

export default Notification;
