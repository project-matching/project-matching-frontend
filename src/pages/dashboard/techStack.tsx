import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddTechStack from '@/components/Dashboard/TechStack/AddTechStack';
import TechstackList from '@/components/Dashboard/TechStack/TechstackList';

const DashboardTechStack = () => {
  return (
    <DashboardLayout>
      <AddTechStack />
      <TechstackList />
    </DashboardLayout>
  );
};

export default DashboardTechStack;
