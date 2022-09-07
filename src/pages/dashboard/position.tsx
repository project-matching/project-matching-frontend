import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddPosition from '@/components/Dashboard/Position/AddPosition';
import PositionList from '@/components/Dashboard/Position/PositionList';

const DashboardPosition = () => {
  return (
    <DashboardLayout>
      <AddPosition />
      <PositionList />
    </DashboardLayout>
  );
};

export default DashboardPosition;
