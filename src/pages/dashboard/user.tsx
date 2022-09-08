import DashboardLayout from '@/components/Dashboard/DashboardLayout';
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
