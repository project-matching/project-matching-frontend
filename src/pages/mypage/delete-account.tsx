import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import DeleteAccount from '@/components/MyPage/DeleteAccount';
import MyPageLayout from '@/components/MyPage/MyPageLayout';

const MyPageDeleteAccount = () => {
  return (
    <PrimaryLayout>
      <MyPageLayout>
        <DeleteAccount />
      </MyPageLayout>
    </PrimaryLayout>
  );
};

export default MyPageDeleteAccount;
