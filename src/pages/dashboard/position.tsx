import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddPosition from '@/components/Dashboard/Position/AddPosition';
import PositionList from '@/components/Dashboard/Position/PositionList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { getPositions } from 'src/redux/reducers/positions';

const DashboardPosition = () => {
  const positions = useAppSelector((state) => state.position.positions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <AddPosition />
      {positions && <PositionList positions={positions} />}
    </DashboardLayout>
  );
};

export default DashboardPosition;
