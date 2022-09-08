import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddPosition from '@/components/Dashboard/Position/AddPosition';
import PositionList from '@/components/Dashboard/Position/PositionList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPositions } from 'src/redux/reducers/positions';

const DashboardPosition = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <AddPosition />
      <PositionList />
    </DashboardLayout>
  );
};

export default DashboardPosition;
