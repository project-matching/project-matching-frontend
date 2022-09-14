import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import SuccessPasswordChangeModal from '@/components/Modals/SuccessPasswordChangeModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useAppSelector } from 'src/redux/hooks';

const MyPageChangePassword = () => {
  const successPasswordChangeModal = useAppSelector(
    (state) => state.modal.SuccessPasswordChangeModal
  );
  return (
    <PrimaryLayout>
      <MyPageLayout>
        {successPasswordChangeModal && <SuccessPasswordChangeModal />}
        <ChangePasswordForm />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageChangePassword;
