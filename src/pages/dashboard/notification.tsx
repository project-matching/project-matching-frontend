import PrimaryButton from '@/components/Buttons/PrimaryButton';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styled from '@emotion/styled';

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
  return (
    <DashboardLayout>
      <Form>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="content">내용 (200자)</label>
          <textarea name="content" id="content" maxLength={200} />
        </div>
        <div>
          <PrimaryButton>보내기</PrimaryButton>
        </div>
      </Form>
    </DashboardLayout>
  );
};

export default DashboardNotification;
