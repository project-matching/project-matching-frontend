import DashboardLayout from '@/components/Common/Layouts/DashboardLayout';
import AddTechStack from '@/components/Dashboard/TechStack/AddTechStack';
import TechstackList from '@/components/Dashboard/TechStack/TechstackList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getTechStacks } from 'src/redux/reducers/techstacks';

const DashboardTechStack = () => {
  const dispatch = useDispatch();
  const techstacks = useAppSelector((state) => state.techStack.techstacks);

  useEffect(() => {
    dispatch(getTechStacks());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <AddTechStack />
      {techstacks && <TechstackList techstacks={techstacks} />}
    </DashboardLayout>
  );
};

export default DashboardTechStack;
