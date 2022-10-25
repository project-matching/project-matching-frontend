import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import AlertModal from '@/components/Modals/AlertModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getUserProfile } from 'src/redux/reducers/users';

const MyPageChangePassword = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const alertModal = useAppSelector((state) => state.modal.AlertModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <MyPageLayout>
          {alertModal && <AlertModal content="비밀번호가 변경되었습니다." />}
          <ChangePasswordForm />
        </MyPageLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyPageChangePassword;
