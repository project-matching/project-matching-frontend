import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { notificationDetail } from 'src/redux/reducers/notification';
import { NotificationService } from 'src/services/NotificationService';
import { Backdrop } from '../Modals/Backdrop';
import NotificationModal from '../Modals/NotificationModal';

const DEFAULT_NOTIFICATION_IMAGE: string = `/notification.png`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

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

interface NotificationType {
  notificationNo: number;
  type: string;
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
  const token = useAppSelector((state) => state.auth.token);
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
      ${(props) =>
        `color: ${
          props.read ? props.theme.colors.gray : props.theme.colors.black
        };`}
    }
  `;

  const dropdownEl = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = (e: Event) => {
    if (isOpen && !dropdownEl.current?.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    isOpen ? setOpen(false) : setOpen(true);
  };

  const openNotificationModal = (notification: NotificationType) => {
    /**
     * TODO:
     *
     * 로직
     * 1. global notification 상태 만들기
     * 2. 모달 창 열기
     * 3. 모달 창에 상태 내용 넣기
     * 4. 모달 창 닫을 때 notification 상태 null로 변경
     * 5. 에러 핸들링
     */
    dispatch(notificationDetail(notification.notificationNo));
    dispatch(openModal('NotificationModal'));
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseDropdown);

    return () => {
      window.removeEventListener('click', handleCloseDropdown);
    };
  });

  useEffect(() => {
    token &&
      isOpen &&
      (async () =>
        setNotificationPreview(
          await NotificationService.getNotificationPreview()
        ))();
  }, [token, isOpen]);

  return (
    <Container>
      <ImageContainer onClick={toggleDropdown}>
        <Image
          src={DEFAULT_NOTIFICATION_IMAGE}
          alt="profile_image"
          width="40px"
          height="40px"
        />
      </ImageContainer>
      <Dropdown ref={dropdownEl}>
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
