import styled from '@emotion/styled';
import Link from 'next/link';
import notificationImage from 'public/notification.png';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { notificationDetail } from 'src/redux/reducers/notification';
import { NotificationService } from 'src/services/NotificationService';
import { Backdrop } from '../Modals/Backdrop';
import NotificationModal from '../Modals/NotificationModal';
import ImageToggle from './ToggleDropdown/ImageToggle';

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
  const dispatch = useDispatch();
  const notificationModal = useAppSelector(
    (state) => state.modal.NotificationModal
  );
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

  interface NotificationStyleType {
    read?: boolean;
  }

  const NotificationContainer = styled.a<NotificationStyleType>`
    ${(props) =>
      `color: ${
        props.read ? props.theme.colors.gray : props.theme.colors.black
      };`}
    width: inherit;
    font-size: ${(props) => props.theme.sizes.sm};
    overflow: hidden;
    margin-bottom: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2;

    &:visited {
      ${(props) => `color: ${props.theme.colors.gray};`}
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

  const openNotificationModal = (notification: NotificationType) => {
    /**
     * TODO:
     *
     * 로직
     * 1. global notification 상태 만들기 (O)
     * 2. 모달 창 열기 (O)
     * 3. 모달 창에 상태 내용 넣기 (O)
     * 4. 모달 창 닫을 때 notification 상태 null로 변경 (O)
     * 5. 에러 핸들링
     */
    dispatch(notificationDetail(notification.notificationNo));
    dispatch(openModal('NotificationModal'));
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
                read={notification.read}
                key={notification.notificationNo}
                onClick={() => openNotificationModal(notification)}
              >
                {notification.title}
              </NotificationContainer>
            ))}
          <Link href="/notification" passHref>
            <NotificationContainer>알림 더보기</NotificationContainer>
          </Link>
        </LinkContainer>
      </Dropdown>
      {notificationModal && (
        <Backdrop>
          <NotificationModal />
        </Backdrop>
      )}
    </Container>
  );
};

export default Notification;
