import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import SuccessPasswordChangeModal from '@/components/Modals/SuccessPasswordChangeModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserProfile } from 'src/redux/reducers/users';

const MyPageChangePassword = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const successPasswordChangeModal = useAppSelector(
    (state) => state.modal.SuccessPasswordChangeModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <MyPageLayout>
          {successPasswordChangeModal && <SuccessPasswordChangeModal />}
          <ChangePasswordForm />
        </MyPageLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyPageChangePassword;
