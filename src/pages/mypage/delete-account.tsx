import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import SuccessDeleteUserModal from '@/components/Modals/SuccessDeleteUserModal';
import DeleteAccount from '@/components/MyPage/DeleteAccount';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useAppSelector } from 'src/redux/hooks';

const MyPageDeleteAccount = () => {
  const successDeleteUserModal = useAppSelector(
    (state) => state.modal.SuccessDeleteUserModal
  );
  return (
    <PrimaryLayout>
      <MyPageLayout>
        {successDeleteUserModal && <SuccessDeleteUserModal />}
        <DeleteAccount />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageDeleteAccount;
