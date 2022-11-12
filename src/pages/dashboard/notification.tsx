import PrimaryButton from '@/components/Common/Buttons//PrimaryButton';
import DashboardLayout from '@/components/Common/Layouts/DashboardLayout';
import AlertModal from '@/components/Common/Modals/AlertModal';
import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { NotificationService } from 'src/services/NotificationService';

const DashboardNotification = () => {
  const dispatch = useDispatch();
  const alertModal = useAppSelector((state) => state.modal.AlertModal);
  const [modalContent, setModalContent] = useState('');
  const submitNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };

    const title = target.title.value;
    const content = target.content.value;

    // TODO: pending일 경우 제출하기 비활성화
    try {
      await NotificationService.postNotification({ title, content });

      target.title.value = '';
      target.content.value = '';

      setModalContent('공지가 전송되었습니다.');
      dispatch(openModal('AlertModal'));
    } catch (error: any) {
      if (error.response?.status === 400) {
        setModalContent('제목 및 내용을 작성해주세요.');
        dispatch(openModal('AlertModal'));
      } else {
        setModalContent(
          `잠시 후 다시 시도해주세요. 에러 코드: ${error.response?.status}`
        );
        dispatch(openModal('AlertModal'));
      }
    }
  };

  return (
    <DashboardLayout>
      <Form onSubmit={submitNotification}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="content">내용 (200자)</label>
          <textarea name="content" id="content" maxLength={200} />
        </div>
        <div>
          <PrimaryButton type="submit">보내기</PrimaryButton>
        </div>
      </Form>
      {alertModal && <AlertModal content={modalContent} />}
    </DashboardLayout>
  );
};

export default DashboardNotification;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    &:last-child {
      margin: 0 auto;
      width: 200px;
    }
  }

  input {
    margin: 20px 0;
    padding: 5px 10px;
    width: 100%;
    font-size: 16px;
    border: 1px solid ${colors.gray300};
  }

  textarea {
    margin: 20px 0;
    padding: 5px 10px;
    width: 100%;
    height: 200px;
    border: 1px solid ${colors.gray300};
  }
`;
