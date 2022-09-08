import PrimaryButton from '@/components/Buttons/PrimaryButton';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styled from '@emotion/styled';
import React from 'react';
import { NotificationService } from 'src/services/NotificationService';

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
    border: 1px solid #d4d4d4;
  }

  textarea {
    margin: 20px 0;
    padding: 5px 10px;
    width: 100%;
    height: 200px;
    border: 1px solid #d4d4d4;
  }
`;

const DashboardNotification = () => {
  const submitNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };

    const title = target.title.value;
    const content = target.content.value;

    // TODO: 확인 모달 머지 후 모달 반영 열기
    // 확인 버튼 클릭시 아래 메서드 실행
    // 에러 처리
    await NotificationService.postNotification({ title, content });
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
    </DashboardLayout>
  );
};

export default DashboardNotification;
