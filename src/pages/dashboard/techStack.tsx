import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddTechStack from '@/components/Dashboard/TechStack/AddTechStack';
import TechstackList from '@/components/Dashboard/TechStack/TechstackList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTechStacks } from 'src/redux/reducers/techstacks';
const DashboardTechStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechStacks());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <AddTechStack />
      <TechstackList />
    </DashboardLayout>
  );
};

export default DashboardTechStack;
