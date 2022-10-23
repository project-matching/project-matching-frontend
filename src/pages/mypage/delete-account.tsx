import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import SuccessDeleteUserModal from '@/components/Modals/SuccessDeleteUserModal';
import DeleteAccount from '@/components/MyPage/DeleteAccount';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserProfile } from 'src/redux/reducers/users';

const MyPageDeleteAccount = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const successDeleteUserModal = useAppSelector(
    (state) => state.modal.SuccessDeleteUserModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <MyPageLayout>
          {successDeleteUserModal && <SuccessDeleteUserModal />}
          <DeleteAccount />
        </MyPageLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyPageDeleteAccount;
