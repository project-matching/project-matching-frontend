import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MyPageLayout from '@/components/MyPage/MyPageLayout';

const MyPageChangePassword = () => {
  return (
    <PrimaryLayout>
      <MyPageLayout>
        <ChangePasswordForm />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageChangePassword;
