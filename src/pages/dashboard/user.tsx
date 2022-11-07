import DashboardLayout from '@/components/Common/Layouts/DashboardLayout';
import SearchUser from '@/components/Dashboard/User/SearchUser';
import UserList from '@/components/Dashboard/User/UserList';

const DashboardUser = () => {
  return (
    <DashboardLayout>
      <SearchUser />
      <UserList />
    </DashboardLayout>
  );
};

export default DashboardUser;
